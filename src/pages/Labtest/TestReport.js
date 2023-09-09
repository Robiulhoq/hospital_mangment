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

function TestReport({userRole}){
    const {labList, hendleLabUI, hendleEditLab} = useContext(DataContext);
    const [deleteMessage, setDeleteMessage] = useState('');

    const hendleDeletLabReport = async(id) =>{
        try{
            const response = await axios.delete(`http://localhost:5000/lab/${id}`)
            if(response.status === 200){
                response.message = 'Report Delete Successfull';
                setDeleteMessage(response.message);
                hendleLabUI(true);

            }
        }catch(error){
            console.log(error);
        }
    }
    if (deleteMessage) {
        setInterval(() => {
            setDeleteMessage('');
            hendleLabUI(false);
        }, 5000);
    }

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Test Report' />
                <Message message={deleteMessage} />
                <Activity>
                <DataFiltter>
                        <GreenButton>+ Add Test</GreenButton>
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
                            <th>Patient ID</th>
                            <th>Test name</th>
                            <th>Result</th>
                            <th>Doctor Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                       {
                        labList? labList.map((item, index )=> (
<tr>
                            <td>{index +1}</td>
                            <td>{item.patientId}</td>
                            <td>{item.testName}</td>
                            <td>{item.result}</td>
                            <td>{item.doctorName}</td>
                            <td>{item.status}</td>
                            <td><Link to='/labtest/0' ><BiEdit onClick={()=> hendleEditLab(item._id)} size='1.5rem' color='darkblue' /> </Link> 
                            <AiFillDelete onClick={()=> hendleDeletLabReport(item._id)} color='red' size='1.5rem' /></td>
                        </tr>
                        )): <p>Null</p>
                       }
                        
                        
                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default TestReport;