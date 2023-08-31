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
function AppoinmentList() {
    const { patientList, hendlePatientUI } = useContext(DataContext);

    const [message, setMessage] = useState('');
    const deleteAppoinment = async (patientId, apId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/patient/appoinment/${patientId}/${apId}`)
            if(response.status === 200){
                hendlePatientUI(true);
                response.message = 'Appoinment Delete successfull';
                setMessage(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (message) {
        setInterval(() => {
            setMessage('');
            hendlePatientUI(false)
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Appoinment List' />
                <Message message={message} />
                <Activity>
                    <DataFiltter>
                        <GreenButton>+ Add Appoinment</GreenButton>
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
                            <th>Patient ID</th>
                            <th>Doctor Name</th>
                            <th>Appoinment Date</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            patientList.map((item, index) => item.appoinment.map(ap => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item._id}</td>
                                    <td>{ap.doctorName}</td>
                                    <td>{ap.date}</td>
                                    <td>{ap.department}</td>

                                    <td>{ap.status}</td>
                                    <td>
                                    <AiFillDelete onClick={()=> deleteAppoinment(item._id, ap._id)} color='red' size='1.5rem' /></td>
                                </tr>

                            )))
                        }

                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default AppoinmentList;