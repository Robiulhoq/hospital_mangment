import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import TextInput from '../../components/TextInput';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import Message from '../../components/Message';
import { DataContext } from '../../ContextApi/DataContext';


const Department = () => {
    const { updateUI, departmentList, editDepartmentId } = useContext(DataContext);
    const [message, setMessage] = useState('');
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

    const hendleSaveDepartment = async () => {
        try {
            let apiUrl = 'http://localhost:5000/department';
            let method = 'POST';

            if (editMode) {
                apiUrl += `/${editDepartmentId}`;
                method = 'PUT';
            }

            const response = await fetch(apiUrl, {
                method: method,
                body: JSON.stringify(department),
                headers: { 'Content-Type': 'application/json' }
            });
          
            updateUI(true);
            response.message = editMode ? 'Department edit successfull' : 'Department save successfull';
            setMessage(response.message);

        } catch (error) {
            console.error('Error:', error);
        }
        setDepartment( preDevertment => ({
            ...preDevertment,
            departmentName: '',
            description: '',
            status: 'active'
        }));

    };

    if (message) {
        setInterval(() => {
            setMessage('');
            updateUI(false)
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content>
                <TopBar title='Add Department' />
                <Message message={message} />
                <Activity>
                    <BlueButton>Depratment List</BlueButton>
                    <TextInput defaultValue={department.departmentName} onChange={hendleChange} name='departmentName' title="Department Name" placeholder='Department Name' type='text' />
                    <TextInput defaultValue={department.description} onChange={hendleChange} name='description' title="Description" placeholder='Description' type='textarea' />
                    <TextInput defaultValue={department.status} onChange={hendleChange} name='status' title="status" type='radio' options={['active', 'deactive']} />
                    <GreenButton onClick={hendleSaveDepartment}>Save</GreenButton>

                </Activity>
            </Content>
        </Wrapper>
    )
}

export default Department;