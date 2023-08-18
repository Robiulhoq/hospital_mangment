import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import DataFiltter from "../../components/DataFiltter";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';


function ListPayment(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='List Account' />
                <Activity>
                <DataFiltter>
                        <GreenButton>+ Add Account</GreenButton>
                        <div>
                            <TextInput type='radio' title='Show' options={['10', '20']} />
                        </div>
                        <div>
                            <TextInput type='text' title='Search' />
                        </div>
                    </DataFiltter>
                    <h3 style={{margin: '1rem'}}>Debit</h3>
                    <table className='department_table'>
                        <tr>
                            <th>SL. NO</th>
                            <th>Account Name</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Status No</th>
                            <th>Action</th>
                        </tr>
                       
                        <tr>
                            <td>3</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                    </table>
                    <h3 style={{margin: '1rem'}}>Credit</h3>
                    <DataFiltter>
                        <GreenButton>+ Add Account</GreenButton>
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
                            <th>Account Name</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Status No</th>
                            <th>Action</th>
                        </tr>
                       
                        <tr>
                            <td>3</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                    </table>
                </Activity>
                
            </Content>
        </Wrapper>
    )
}
export default ListPayment;