import React, { useContext, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import DataFiltter from "../../components/DataFiltter";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { DataContext } from "../../ContextApi/DataContext";
import Message from "../../components/Message";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCookie } from "../../Utils/getCookie";

function EmployList({userRole}) {
    const { hrList, hendleHrUI, hendleEditHr, editHrId } = useContext(DataContext);
    const [deleteMessage, setDeleteMessage] = useState('');
    const token = getCookie('access_token');
    const hendleDeleteEmploy = async (id) => {
        try {

            const response = await axios.delete(`http://localhost:5000/hr/${id}`,{
                headers: {'Authorization': `Bearer ${token}`}
            });
            if(response.status === 200){
                response.message = "Employ delete successfull";
                setDeleteMessage(response.message);
                hendleHrUI(true);
            }
        } catch (error) {
            setDeleteMessage('Error deleting HR');
        }
    }
    if (deleteMessage) {
        setInterval(() => {
            setDeleteMessage('');
            hendleHrUI(false);

        }, 5000);
    }

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole}/>
            </SidebarContainer>
            <Content >
                <TopBar title='Employ List' />
                <Message message={deleteMessage} />
                <Activity>
                    <DataFiltter>
                    <Link to='/hr/0' ><GreenButton>+ Add Employ</GreenButton></Link> 
                        <div>
                            <TextInput type='radio' title='Show' options={['10', '20']} />
                        </div>
                        <div>
                            <TextInput type='text' title='Search' />
                        </div>
                    </DataFiltter>
                    <h3 style={{ margin: '1rem' }}>Debit</h3>
                    <table className='department_table'>
                        <tr>
                            <th>SL. NO</th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>User Role</th>
                            <th>Email address</th>
                            <th>Mobile NO</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            hrList.map((item, index) => (
                                <tr>
                                    <td>{index +1}</td>
                                    <td style={{height: '100px', width: '100px'}}><img style={{height: '100px', width: '100px'}} src={item.picture} /></td>
                                    <td>{item.fastName}</td>
                                    <td>{item.userRole}</td>
                                    <td>{item.emailAddress}</td>
                                    <td>{item.mobileNo}</td>
                                    <td>{item.address}</td>
                                    <td>{item.status}</td>
                                    <td><Link to='/hr/0'><BiEdit onClick={()=>hendleEditHr(item._id)} size='1.5rem' color='darkblue' /> </Link> 
                                    <AiFillDelete onClick={()=>hendleDeleteEmploy(item._id)} color='red' size='1.5rem' /></td>
                                </tr>
                            ))
                        }
                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default EmployList;