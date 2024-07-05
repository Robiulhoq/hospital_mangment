import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { DataContext } from '../../ContextApi/DataContext';
import { getCookie } from '../../Utils/getCookie';
import { GreenButton } from '../../components/Buttons';
import { Activity, Content, SidebarContainer, Wrapper } from '../../components/Common';
import DataFiltter from '../../components/DataFiltter';
import Message from '../../components/Message';
import Sidebar from '../../components/Sidebar';
import TextInput from '../../components/TextInput';
import TopBar from '../../components/TopBar';

function DoctorList({userRole}) {
    const { hendleDoctorUI, doctorList, handleEditDoctor } = useContext(DataContext);
    console.log('this is doctor data',doctorList);
    const [deleteMessage, setDeleteMessage] = useState('');
    const token = getCookie('access_token');
    const hendleDeleteDoctor = async (id) => {
        try {

            const response = await axios.delete(`https://hospital-mangment.onrender.com/doctor/${id}`,{
                headers: {'Authorization': `Bearer ${token}`}
            });
            setDeleteMessage(response.data);
            hendleDoctorUI(true);

        } catch (error) {
            setDeleteMessage('Error deleting department');
        }
    }
    if (deleteMessage) {
        setInterval(() => {
            setDeleteMessage('');
            hendleDoctorUI(false);

        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content>
                <TopBar title='Doctor List' />
                <Message message={deleteMessage} />
                <Activity>
                    <DataFiltter>
                    <Link to='/doctor/0' ><GreenButton>+ Add Doctor</GreenButton></Link> 
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
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>E-mail address</th>
                            <th>Mobile No</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            doctorList.length ? doctorList.map((item, index) => (
                                <tr key={index}>
                                    <td>{index +1}</td>
                                    <td style={{height: '100px', width: '100px'}}><img style={{height: '100px', width: '100px'}} src={item.picture} /></td>
                                    <td>{item.fastName}</td>
                                    <td>{item.department}</td>
                                    <td>{item.emailAddress}</td>
                                    <td>{item.phoneNo}</td>
                                    <td>{item.status}</td>
                                    <td><Link to='/doctor/0'> <BiEdit onClick={()=>handleEditDoctor(item._id)} size='1.5rem' color='darkblue' /> </Link>
                                    <AiFillDelete onClick={()=>hendleDeleteDoctor(item._id)} color='red' size='1.5rem' /></td>
                                </tr>
                            )) : <p>Loading......</p>
                        }

                    </table>
                </Activity>

            </Content>
        </Wrapper>
    )
}

export default DoctorList