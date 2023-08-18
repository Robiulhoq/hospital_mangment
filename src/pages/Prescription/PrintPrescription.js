import React from "react";
import './printPrescription.css';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { GrView } from 'react-icons/gr';

function PrintPrescription() {

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Print Schedule' />
                <Activity id="prescription_container">
                    <section id="patintId">
                        <p><b>Patient ID: { }</b></p>
                        <p><b>Date{ }</b></p>
                    </section>
                    <section id="hospitalInfo">
                        <div>
                            <p><b>Robiul Hoque</b></p>
                            <p>Doctor</p>
                            <p>Feni, Bangladesh</p>
                        </div>
                        <div>
                            <p><b>Demo Hospital Lemited</b></p>
                            <p>House#25, 4th Floor, Mannan Plaza, Khilkhet, Dhaka-1229, Bangladesh.</p>
                            <p>robiul@gmail.com</p>
                            <p>4165446+456</p>
                        </div>
                    </section>
                    <section id="basicInfo">
                        <p><b>Patient Name: </b></p>
                        <p>Age: </p>
                        <p>Sex: </p>
                        <p>Weight: </p>
                    </section>
                    <section id="prescriptionInfoContainer">
                        <div className="doctorComment">
                            <p><b>Chief Complain:</b> motorbike accident</p>
                            <p><b>Patient Notes:</b> eat evering thing, bed rest compulsory</p>
                        </div>
                        <div className="medicine_table">
                        <table className='department_table medicine_headline'>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Type</th>
                            <th>Days</th>
                            <th>Instruction</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                            <td>Germany</td>
                            
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                            <td>Mexico</td>
                          
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                            <td>Mexico</td>
                          
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                            <td>Mexico</td>
                          
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                            <td>Mexico</td>
                          
                        </tr>
                       
                    </table>
                    <table className='department_table diagonosis'>
                        <tr>
                            <th>Diagnosis</th>
                            <th>Instruction</th>
                        </tr>
                        <tr>
                            <td>Germany</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Mexico</td>
                            <td>Mexico</td>
                        </tr>
                    </table>
 
                        </div>
                    </section>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default PrintPrescription;