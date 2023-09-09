import React, { useContext, useState } from 'react'
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import DataFiltter from '../../components/DataFiltter';
import TextInput from '../../components/TextInput';
import { DataContext } from '../../ContextApi/DataContext';
import axios from 'axios';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { getCookie } from '../../Utils/getCookie';

function ListPatient({userRole}) {
    const { patientList, hendleEditPatient, hendlePatientUI } = useContext(DataContext);
    const [deleteMessage, setDeleteMessage] = useState('');
    const token = getCookie('access_token');
    const hendleDeletePatient = async (id) =>{
        try {

            const response = await axios.delete(`http://localhost:5000/patient/${id}`,{
                headers: {'Authorization': `Bearer ${token}`}
            });
            if(response.status == 200){
                response.message = 'Pataient delete successfull';
                setDeleteMessage(response.message);
                hendlePatientUI(true);
            }

        } catch (error) {
            setDeleteMessage('Error deleting patient');
        }
    }

    if (deleteMessage) {
        setInterval(() => {
            setDeleteMessage('');
            hendlePatientUI(false);

        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content>
                <TopBar title='Patient List' />
                <Message message={deleteMessage} />
                <Activity>
                    <DataFiltter>
                        <GreenButton>+ Add Patient</GreenButton>
                        <div>
                            <TextInput type='radio' title='Show' options={['10', '20']} />
                        </div>
                        <div>
                            <TextInput type='text' title='Search' />
                        </div>
                    </DataFiltter>
                    <table className='department_table'>
                        <tr>
                            <th>SL. NO</th>
                            <th>ID NO</th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>E-mail address</th>
                            <th>Mobile No</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            patientList.length ? patientList.map((item, index) => (
                                <tr>
                                    <td>{index +1}</td>
                                    <td>{item._id}</td>
                                    <td><img style={{height: '100px', width: '100px'}} src={item.picture}/></td>
                                    <td>{item.fastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.emailAddress}</td>
                                    <td>{item.mobileNo}</td>
                                    <td>{item.bloodGroup}</td>
                                    <td>{item.status}</td>
                                    <td><Link to='/patient/0'><BiEdit onClick={()=> hendleEditPatient(item._id)} size='1.5rem' color='darkblue' /></Link> 
                                    <AiFillDelete onClick={()=>hendleDeletePatient(item._id)} color='red' size='1.5rem' /></td>
                                </tr>
                            )): <p></p>
                        }


                    </table>
                </Activity>

            </Content>
        </Wrapper>
    )
}

export default ListPatient