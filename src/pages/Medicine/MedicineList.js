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

function MedicineList({userRole}) {
    const { medicineList, hendleMedicineUI, hendleEditMedicine } = useContext(DataContext);
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const hendleDeleteMedicine = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/medicine/${id}`, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            if (response.status === 200) {
                response.message = 'Medicine Delete Successfull';
                setMessage(response.message);
                hendleMedicineUI(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (message) {
        setInterval(() => {
            setMessage('');
            hendleMedicineUI(false);
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Medicine List' />
                <Message message={message} />
                <Activity>
                    <DataFiltter>
                    <Link to='/medicine/0' ><GreenButton>+ Add medicine</GreenButton></Link> 
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
                            <th>Medicine Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Menufactured By</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            medicineList.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.medicineName}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.manufactured}</td>
                                    <td>{item.status}</td>
                                    <td> <Link to='/medicine/0'><BiEdit onClick={() => hendleEditMedicine(item._id)} size='1.5rem' color='darkblue' /></Link> 
                                        <AiFillDelete onClick={() => hendleDeleteMedicine(item._id)} color='red' size='1.5rem' /></td>
                                </tr>
                            ))
                        }
                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default MedicineList;