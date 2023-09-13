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
import { getCookie } from "../../Utils/getCookie";
import { Link } from "react-router-dom";

function AssignBedList({userRole}) {
    const { assainBedList, bedList, hendleAssainBedUI } = useContext(DataContext);

    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const hendleDeleteAssainBed = async (id) => {
        try {
            const response = await axios.delete(`https://hospital-mangment.onrender.com/assainbed/${id}`, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            if (response === 200) {
                hendleAssainBedUI(true);
                response.message = 'Delete Successfull';
                setMessage(response.message);

            }
        } catch (error) {
            console.log(error);
        }
    }
    if (message) {
        setInterval(() => {
            setMessage('');
            hendleAssainBedUI(false)
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Assaine Bed List' />
                <Message message={message} />
                <Activity>
                    <DataFiltter>
                    <Link to='/bed/2' ><GreenButton>+ Assain Bed</GreenButton></Link> 
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
                            <th>Description</th>
                            <th>Day</th>
                            <th>Charge</th>
                            <th>Total</th>
                            <th>Assaine Date</th>
                            <th>Discharge Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            assainBedList ? assainBedList.map((item, index) => {
                                const asi = new Date(item.assainDate);
                                const dis = new Date(item.dischargeDate);
                                const differanceDays = dis.getTime() - asi.getTime();
                                const days = differanceDays / (1000 * 3600 * 24)
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.patientId}</td>
                                        <td>{item.description}</td>
                                        <td>{days}</td>
                                        <td>{item.bedType}</td>
                                        <td>{item.bedType * days}</td>
                                        <td>{asi.getDate() + '-' + (asi.getMonth() + 1) + '-' + asi.getFullYear()}</td>
                                        <td>{dis.getDate() + '-' + (dis.getMonth() + 1) + '-' + dis.getFullYear()}</td>
                                        <td>{item.status}</td>
                                        <td><BiEdit size='1.5rem' color='darkblue' />
                                            <AiFillDelete onClick={() => hendleDeleteAssainBed(item._id)} color='red' size='1.5rem' /></td>
                                    </tr>
                                )
                            }

                            ) : null
                        }


                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default AssignBedList;