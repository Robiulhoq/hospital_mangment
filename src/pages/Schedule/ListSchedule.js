import React, { useContext, useState } from "react";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import DataFiltter from "../../components/DataFiltter";
import { DataContext } from "../../ContextApi/DataContext";
import axios from "axios";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { getCookie } from "../../Utils/getCookie";
function ListSchedule({userRole}) {
    const { doctorList, hendleDoctorUI, hendleEditSchedule } = useContext(DataContext);
    // const schedule = doctorList.map(item => item.schedule);
    // console.log(schedule);
    const [deleteMessage, setDeleteMessage] = useState('');
    const token = getCookie('access_token');
    const hendleDeleteSchedule = async (doctorId, scheduleId) =>{
        try{
            const response = await axios.delete(`https://hospital-mangment.onrender.com/doctor/schedule/${doctorId}/${scheduleId}`,{
                headers: {'Authorization': `Bearer ${token}`}
            });
            response.message = 'Schedule delete successfull';
            setDeleteMessage(response.message);
            hendleDoctorUI(true);
        }catch(error){
            console.log(error);
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
            <Content >
                <TopBar title='List Schedule' />
                <Message message={deleteMessage} />
                <Activity>
                    <DataFiltter>
                    <Link to='/schedule/0' ><GreenButton>+ Add Schedule</GreenButton></Link> 
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
                            <th>Doctor Name</th>
                            <th>Department</th>
                            <th>Day</th>
                            <th>Time</th>
                            <th>Per patient Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            doctorList ? doctorList.map((item, index) => (
                                item.schedule.map(sche => (
                                    <tr key={index}>

                                        <td>{index + 1}</td>
                                        <td>{item.fastName}</td>
                                        <td>{item.department}</td>
                                        <td>{sche.abailableDays}</td>
                                        <td>{sche.availableTime}</td>
                                        <td>{sche.patientTime}</td>
                                        <td>{sche.status}</td>
                                        <td> <Link to='/schedule/0'><BiEdit onClick={()=> hendleEditSchedule(item._id, sche._id)} size='1.5rem' color='darkblue' /> </Link> 
                                        <AiFillDelete onClick={()=> hendleDeleteSchedule(item._id, sche._id)} color='red' size='1.5rem' /></td>
                                    </tr>
                                ))

                            )) : <p></p>
                        }


                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default ListSchedule;