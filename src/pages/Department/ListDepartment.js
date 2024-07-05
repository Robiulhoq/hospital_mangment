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
import './ListDepartment.css';

const ListDepartment = ({userRole}) => {
    const {updateUI, departmentList, handleEditDepartment  } = useContext(DataContext);
    const [deleteMessage, setDeleteMessage] = useState('');
    const token = getCookie('access_token');
    const deleteDepartment = async (id) => {
        try {

            const response = await axios.delete(`https://hospital-mangment.onrender.com/department/${id}`, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            setDeleteMessage(response.data);
            updateUI(true);

        } catch (error) {
            setDeleteMessage('Error deleting department');
        }
    }
    if (deleteMessage) {
        setInterval(() => {
            setDeleteMessage('');
            updateUI(false);

        }, 5000);
    }

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content>
                <TopBar title='List department' />
                <Message message={deleteMessage} />
                <Activity>

                    <DataFiltter>
                        <Link to='/department/0' ><GreenButton>+ Add Department</GreenButton></Link>
                        
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
                        {departmentList.length?
                            departmentList.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.departmentName}</td>
                                    <td>{item.description}</td>
                                    <td>{item.status}</td>
                                    <td><Link to='/department/0'>
                                    <BiEdit onClick={() => handleEditDepartment(item._id)} style={{ cursor: 'pointer' }} size='1.5rem' color='darkblue' /></Link> 
                                    <AiFillDelete onClick={() => deleteDepartment(item._id)} style={{ cursor: 'pointer' }} color='red' size='1.5rem' /></td>
                                </tr>
                            )) : <td>Loading...</td>
                        }
                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}

export default ListDepartment