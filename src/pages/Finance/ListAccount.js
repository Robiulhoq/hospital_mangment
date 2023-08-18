import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import DataFiltter from "../../components/DataFiltter";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
function ListService(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='List Payment' />
                <Activity>
                <DataFiltter>
                        <GreenButton>+ Add Payment</GreenButton>
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
                            <th>Date</th>
                            <th>Account Name</th>
                            <th>Pay to</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                       
                        <tr>
                            <td>3</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
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
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default ListService;