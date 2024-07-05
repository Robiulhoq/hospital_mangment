import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../ContextApi/DataContext';
import { BlueButton, GreenButton } from '../../components/Buttons';
import { Activity, Content, SidebarContainer, Wrapper } from '../../components/Common';
import { Loading } from '../../components/Loading';
import Message from '../../components/Message';
import Sidebar from '../../components/Sidebar';
import TextInput from '../../components/TextInput';
import TopBar from '../../components/TopBar';
import usePostrequiest from '../../hooks/usePostrequiest';
const Department = ({userRole}) => {
    const { updateUI, departmentList, editDepartmentId, tigger, setTigger } = useContext(DataContext);
    // const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [department, setDepartment] = useState({
        departmentName: '',
        description: '',
        status: 'active'
    });

    const hendleChange = (e) => {
        const updateDepartment = { ...department }
        updateDepartment[e.target.name] = e.target.value;
        setDepartment(updateDepartment);
    }

    useEffect(() => {
        if (editDepartmentId) {
            // Find the department in departmentList based on editDepartmentId
            const editDepartment = departmentList.find(item => item._id === editDepartmentId);

            // Set the component state to the values of the found department
            setDepartment({
                departmentName: editDepartment.departmentName,
                description: editDepartment.description,
                status: editDepartment.status
            });
            setEditMode(true);
        }
    }, [editDepartmentId, departmentList]);

    // hendle save department post requiest using costom hooks
   
    const {loading, message,setMessage, hendleSaveDepartment} = usePostrequiest('https://hospital-mangment.onrender.com/department', department, setTigger)
    //    showing post requiest success message
    if (message) {
        setInterval(() => {
            setMessage('')
        }, 5000);
    }
    console.log(message);
    if(tigger){
        setInterval(()=>{
            setTigger(false);
        }, 1000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content>
                <TopBar title='Add Department' />
                    
                        <Message message={message} />
                
                {loading? <Loading />:
                
                <Activity>
                    <Link to='/department/1' ><BlueButton>Depratment List</BlueButton></Link>
                    <TextInput defaultValue={department.departmentName} onChange={hendleChange} name='departmentName' title="Department Name" placeholder='Department Name' type='text' />
                    <TextInput defaultValue={department.description} onChange={hendleChange} name='description' title="Description" placeholder='Description' type='textarea' />
                    <TextInput defaultValue={department.status} onChange={hendleChange} name='status' title="status" type='radio' 
                    options={[{label: 'Active', value: 'Active'},{label: 'Deactive', value: 'Deactive'}]} />
                    <GreenButton onClick={hendleSaveDepartment}>Save</GreenButton>

                </Activity>}
            </Content>
        </Wrapper>
    )
}

export default Department;