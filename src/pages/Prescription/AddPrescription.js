import React, { useContext, useEffect, useState } from "react";
import '../Finance/Finance.css';
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import axios from "axios";
import { DataContext } from "../../ContextApi/DataContext";
import { getCookie } from "../../Utils/getCookie";
import { Loading } from "../../components/Loading";
import { Link } from "react-router-dom";



function AddPrescription({userRole}) {
    const {medicineList} = useContext(DataContext);
    console.log(medicineList);
    const [totalMedicine, setTotalMedicine] = useState(1);
    const [totalDiagnosis, setTotalDiagnosis] = useState(1);
    const [patientId, setPatientId] = useState('');
    
    const [medicine, setMedicine] = useState([{
        medicineName: '',
        medicineType: '',
        instruction: '',
        day: '',
    }]); // Initial invoice state with one input
    const [diagnosis, setDiagnosis] = useState([{
        diagnosis: '',
        instruction: '',
    }])
    
    const handleAddMedicine = () => {
        setTotalMedicine(totalMedicine + 1);
        setMedicine([...medicine, {
            medicineName: '',
            medicineType: '',
            instruction: '',
            day: ''
        }]); // Add an empty invoice input
    };
    const prescription = medicine.concat(diagnosis);
    
    const handleAddDiagnosis = () => {
        setTotalDiagnosis(totalDiagnosis + 1);
        setDiagnosis([...diagnosis, {
            diagnosis: '',
            instruction: '',
        }]); // Add an empty invoice input
    };

    const handleRemoveMedicine = () => {
        if (totalMedicine > 1) {
            setTotalMedicine(totalMedicine - 1);
            setMedicine(medicine.slice(0, -1)); // Remove the last invoice input
        }
    };

    const handleRemoveDiagnosis = () => {
        if (totalDiagnosis > 1) {
            setTotalDiagnosis(totalDiagnosis - 1);
            setDiagnosis(diagnosis.slice(0, -1)); // Remove the last invoice input
        }
    };

    const handleMedicineChange = (e, index) => {
        const { name, value } = e.target;
        const updatedInvoice = [...medicine];
        updatedInvoice[index][name] = value;
        setMedicine(updatedInvoice);
    };

    const handleDiagnosisChange = (e, index) => {
        const { name, value } = e.target;
        const updatedDiagnosis = [...diagnosis];
        updatedDiagnosis[index][name] = value;
        setDiagnosis(updatedDiagnosis);
    };
    const token = getCookie('access_token');
    const [loading, setLoading] = useState(false);
    const hendleSavePrescription = async () =>{
        try{
            setLoading(true);
            const response = await axios.post(`https://hospital-mangment.onrender.com/prescription/${patientId}`, prescription, {
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            });
            if(response.status === 200){
                console.log('Success');
            }
            setLoading(false);
        }catch(error){
            console.log(error);
        }
    }

    // Single patient
    const [singlePatient, setSinglePatient] = useState(null);
    useEffect(() => {
        fetch(`https://hospital-mangment.onrender.com/patient/filter/${patientId}`,{
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(res => res.json())
            .then(data => setSinglePatient(data));
    }, [patientId])

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Prescription' />
                <Link to='/prescription/3' ><GreenButton>Print Prescription</GreenButton></Link> 
                {
                    loading? <Loading />:
                
                <Activity id="invoice_container">
                    <section id="patientAndHospital">
                        <div className="patient_info_container">
                            <TextInput className='custom_input' onChange={(e)=> setPatientId(e.target.value)} name='patientId' title="Patient Id" type='text' />
                            <TextInput className='custom_input' defaultValue={singlePatient? singlePatient[0].fastName: null} title="Full Name" type='text' />
                            <TextInput className='custom_input' defaultValue={singlePatient? singlePatient[0].sex: null} title="Sex" type='text' />
                            <TextInput className='custom_input' defaultValue={singlePatient? singlePatient[0].dathOfBirth: null} title="Dath of birth" type='text' />
                            <TextInput className='custom_input' title="Chif complain" type='text' />
                            <TextInput className='custom_input' title="Weight" type='text' />
                        </div>
                        <div className="hospital_info_container">
                            <p><b>Demo Hospital Lemited</b></p>
                            <p>House#25, 4th Floor, Mannan Plaza, Khilkhet, Dhaka-1229, Bangladesh.</p>
                            <p>robiul@gmail.com</p>
                            <p>4165446+456</p>
                        </div>
                    </section>

                    <section id="invoice_container">
                        <table className='invoice_table invoice_headline'>
                            <tr>
                                <th>Medicine Name</th>
                                <th>Medicine Type</th>
                                <th>Instruction</th>
                                <th>Day</th>
                                <th>Add / Remove</th>
                            </tr>
                            {
                                medicine.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <select name="medicineName" onChange={(e) => handleMedicineChange(e, index)} className="invoice_input">
                                                {
                                                  medicineList?  medicineList.map(item => (

                                                        <option>{item.medicineName}</option>
                                                    )): null
                                                }
                                                
                                            </select>
                                        </td>

                                        <td><input name="medicineType" onChange={(e) => handleMedicineChange(e, index)} className="invoice_input" /></td>
                                        <td ><input name="instructioin" onChange={(e) => handleMedicineChange(e, index)} className="invoice_input" /></td>
                                        <td><input name="day" onChange={(e) => handleMedicineChange(e, index)} className="invoice_input" /></td>
                                        <td style={{ display: 'flex' }}><GreenButton onClick={handleAddMedicine} >Add</GreenButton>
                                            <BlueButton onClick={handleRemoveMedicine}>Remove</BlueButton></td>
                                    </tr>
                                ))
                            }

                        </table>
                    </section>




                    <section id="invoice_container">
                        <table className='invoice_table diagnosis_headline'>
                            <tr>
                                <th>
                                    Diagnosis</th>
                                <th>	Instruction</th>
                                <th>Add / Remove</th>
                            </tr>
                            {
                                diagnosis.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{minWidth: '97%'}} name="diagnosis" onChange={(e) => handleDiagnosisChange(e, index)} className="invoice_input">
                                        <input style={{minWidth: '100%'}} name="instruction" onChange={(e) => handleDiagnosisChange(e, index)} className="invoice_input" />
                                        </td>
                                        <td style={{minWidth: '300px'}}><input style={{minWidth: '100%'}} name="instruction" onChange={(e) => handleDiagnosisChange(e, index)} className="invoice_input" /></td>
                                        <td style={{ display: 'flex' }}><GreenButton onClick={ handleAddDiagnosis } >Add</GreenButton>
                                            <BlueButton onClick={handleRemoveDiagnosis}>Remove</BlueButton></td>
                                    </tr>
                                ))
                            }

                        </table>
                    </section>
                    
                    <section id="save_and_activity">
                       
                        <div><BlueButton>Reset</BlueButton> <GreenButton onClick={hendleSavePrescription}>Save</GreenButton></div>
                    </section>
                </Activity>}
            </Content>
        </Wrapper>
    )
}
export default AddPrescription;