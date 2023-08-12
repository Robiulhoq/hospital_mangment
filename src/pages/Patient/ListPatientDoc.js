import React from "react";  
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import DataFiltter from "../../components/DataFiltter";
function ListPatientDoc(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Patient Document List' />
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
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>E-mail address</th>
                            <th>Mobile No</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                            <td>Germany</td>
                            <td>Germany</td>
                            <td>Germany</td>
                            <td>Germany</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                            <td>Mexico</td>
                            <td>Mexico</td>
                            <td>Mexico</td>
                            <td>Mexico</td>
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
                            <td>4</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>6</td>
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
export default ListPatientDoc;