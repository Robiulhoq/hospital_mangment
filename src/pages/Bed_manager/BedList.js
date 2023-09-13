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
import { Link } from "react-router-dom";
import { getCookie } from "../../Utils/getCookie";

function BedList({userRole}) {
    const { bedList, hendleBedUI, hendleEditBed } = useContext(DataContext);
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const hendleDeleteBed = async (id) => {
        try {
            const response = await axios.delete(`https://hospital-mangment.onrender.com/bed/${id}`,{
                headers: {'Authorization': `Bearer ${token}`}
            });
            if (response.status === 200) {
                response.message = 'Bed Delete Successfull';
                setMessage(response.message);
                hendleBedUI(true);
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (message) {
        setInterval(() => {
            setMessage('');
            hendleBedUI(false);
        }, 5000);
    }

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Bed List' />
                <Activity>
                    <DataFiltter>
                    <Link to='/bed/0' ><GreenButton>+ Add Bed</GreenButton></Link> 
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
                            <th>Bed Type</th>
                            <th>Description</th>
                            <th>Bed Capacity</th>
                            <th>Charge</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {
                            bedList.map((item, index) => (
                                <tr key={index}>
                                    <td>{index +1}</td>
                                    <td>{item.bedType}</td>
                                    <td>{item.description}</td>
                                    <td>{item.bedCapacity}</td>
                                    <td>{item.charge}</td>
                                    <td>{item.status}</td>
                                    <td> <Link to='/bed/0' ><BiEdit onClick={()=> hendleEditBed(item._id)} size='1.5rem' color='darkblue' /> </Link> 
                                    <AiFillDelete onClick={()=> hendleDeleteBed(item._id)} color='red' size='1.5rem' /></td>
                                </tr>
                            ))
                        }

                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default BedList;