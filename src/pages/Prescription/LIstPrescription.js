// case study showing table component

import React, { useContext } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import DataFiltter from "../../components/DataFiltter";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { GrView } from 'react-icons/gr';
import { DataContext } from "../../ContextApi/DataContext";


function ListPrescription() {
    const { caseStudyList } = useContext(DataContext);

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='List Prescription' />
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
                            <th>Patient Id</th>
                            <th>Food Allergies</th>
                            <th>Tendency Bleed</th>
                            <th>Heart Disease</th>
                            <th>Diabetic</th>
                            <th>Sergery</th>
                            <th>Accident</th>
                            <th>Current Medicine</th>
                            <th>reference</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                        {
                            caseStudyList.map((item, index) => (
                                <tr key={index}>
                                    <td>{index +1}</td>
                                    <td>{item.patientId}</td>
                                    <td>{item.footAllergies}</td>
                                    <td>{item.tendencyBleed}</td>
                                    <td>{item.heartDisease}</td>
                                    <td>{item.diabetic}</td>
                                    <td>{item.sergery}</td>
                                    <td>{item.accident}</td>
                                    <td>{item.currentMedicine}</td>
                                    <td>{item.reference}</td>
                                    <td>{item.status}</td>
                                    <td><GrView size='1.5rem' color='darkblue' /></td>
                                </tr>
                            ))
                        }

                    </table>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default ListPrescription;