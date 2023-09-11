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
import axios from "axios";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { getCookie } from "../../Utils/getCookie";

function ListService({userRole}) {
    const { accountList, hendleAccoutUI, hendleEditAccount } = useContext(DataContext);
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const hendleDeleteAccount = async (id) =>{
        try{
            const response = await  axios.delete(`http://localhost:5000/account/${id}`, {
                headers: {'Authorization': `Bearer ${token}` }
            });
            if(response.status === 200){
                response.message = "Account Delete successfull!";
                setMessage(response.message);
                hendleAccoutUI(true);
            }
        }catch(error){
            console.log(error);
        }
    }
    if (message) {
        setInterval(() => {
            setMessage('');
            hendleAccoutUI(false);

        }, 5000);
    }
    
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='List Account' />
                <Message message={message} />
                <Activity>
                    <DataFiltter>
                    <Link to='/finance/2' ><GreenButton>+ Add Account</GreenButton></Link>  
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
                            <th>Account Name</th>
                            <th>Account Type</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        { accountList?
                            accountList.map((item, index) => (
                                <tr>
                                    <td>{index +1}</td>
                                    <td>{item.accountName}</td>
                                    <td>{item.accountType}</td>
                                    <td>{item.drescription}</td>
                                    <td>{item.status}</td>
                                    <td> <Link to='/finance/2' ><BiEdit onClick={()=> hendleEditAccount(item._id)} size='1.5rem' color='darkblue' /> </Link> 
                                    <AiFillDelete onClick={()=> hendleDeleteAccount(item._id)} color='red' size='1.5rem' /></td>
                                </tr>
                            )): <p>Loading</p>
                        }


                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default ListService;