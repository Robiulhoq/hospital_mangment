import React, { useEffect, useState } from 'react'
import './ListDepartment.css';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { GreenButton } from '../../components/Buttons';
import DataFiltter from '../../components/DataFiltter';
import TextInput from '../../components/TextInput';
import axios from 'axios';
import Message from '../../components/Message';

const ListDepartment = ({departmentList}) => {
      
    
    const [deleteMessage, setDeleteMessage] = useState('');

    // const deleteDepartment = async (id) =>{
    //         try {
    //             const response = await axios.delete(`http://localhost:5000/department/${id}`);
    //             setDeleteMessage(response.data)
    //         } catch (error) {
    //             setDeleteMessage('Error deleting department');
    //         }
    // }
    // if(deleteMessage){
    //     setInterval(() => {
    //             setDeleteMessage('');

    //     }, 5000);
    // }

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content>
                <TopBar title='List department' />
                <Message message={deleteMessage} />
                <Activity>

                    <DataFiltter>
                        <GreenButton>+ Add Department</GreenButton>
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
                            <th>Department</th>
                            <th>Drescripton</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            
                                departmentList.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.departmentName}</td>
                                        <td>{item.description}</td>
                                        <td>{item.status}</td>
                                        <td><BiEdit style={{ cursor: 'pointer' }} size='1.5rem' color='darkblue' /> <AiFillDelete style={{ cursor: 'pointer' }} color='red' size='1.5rem' /></td>
                                    </tr>
                                ))
                             
                            
                        }


                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}

export default ListDepartment