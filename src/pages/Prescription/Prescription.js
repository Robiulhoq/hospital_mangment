// add case stydy component. file name is defernat. fix next time.

import React, { useContext, useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import axios from "axios";
import Message from "../../components/Message";
import { DataContext } from "../../ContextApi/DataContext";
import { getCookie } from "../../Utils/getCookie";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";

function Prescription({userRole}) {
    const { hendleCaseStudyUI } = useContext(DataContext);
    const [caseStudy, setCaseStudy] = useState({
        patientId: '',
        footAllergies: '',
        tendencyBleed: '',
        heartDisease: '',
        highBloodPressure: '',
        diabetic: '',
        sergery: '',
        accident: '',
        other: '',
        familyMedicalHistory: '',
        currentMedicine: '',
        femalePregnancy: '',
        breastFeeding: '',
        healthInsureance: '',
        lowIncome: '',
        reference: '',
        status: 'active',
    });

    const hendleChange = (e) => {
        const updataCaseStudy = { ...caseStudy }
        updataCaseStudy[e.target.name] = e.target.value;
        setCaseStudy(updataCaseStudy);
    }
    
    const [message, setMessage] = useState('');
    const token = getCookie('access_token');
    const [loading, setLoading] = useState(false);
    const hendleSaveCaseStudy = async () => {
        try {
            const values = Object.values(caseStudy);
            if (values.some(value => !value.trim())) {
                setMessage("Please fill out all fields");
                return;
            }
            setLoading(true);
            const response = await axios.post(`https://hospital-mangment.onrender.com/casestudy/${caseStudy.patientId}`, caseStudy, {
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}
            });
            if (response.status === 200) {
                response.message = 'Case study create successfull';
                setMessage(response.message);
                setCaseStudy(prvCaseStady => ({
                    ...prvCaseStady,
                    footAllergies: '',
                    tendencyBleed: '',
                    heartDisease: '',
                    highBloodPressure: '',
                    diabetic: '',
                    sergery: '',
                    accident: '',
                    other: '',
                    familyMedicalHistory: '',
                    currentMedicine: '',
                    femalePregnancy: '',
                    breastFeeding: '',
                    healthInsureance: '',
                    lowIncome: '',
                    reference: '',
                    status: 'active',
                }));
                hendleCaseStudyUI(true);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    if (message) {
        setInterval(() => {
            setMessage('');
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Prescription' />
                <Message message={message} />
                {
                   loading? <Loading /> :
               
                <Activity>
                <Link to='/prescription/1' ><GreenButton>List Case Study</GreenButton></Link>
                    <TextInput onChange={hendleChange} type='text' name='patientId' title='Patient ID' placeholder='Patient ID' />
                    <TextInput onChange={hendleChange} type='text' name='footAllergies' title='Food Allergies' placeholder='Food Allergies' />
                    <TextInput onChange={hendleChange} type='text' name='tendencyBleed' title='Tendency Bleed' placeholder='Tendency Bleed' />
                    <TextInput onChange={hendleChange} type='text' name='heartDisease' title='Heart Disease' placeholder='Heart Disease' />
                    <TextInput onChange={hendleChange} type='text' name='highBloodPressure' title='High Blood Pressure' placeholder='High Blood Pressure' />
                    <TextInput onChange={hendleChange} type='text' name='diabetic' title='Diabetic' placeholder='Diabetic' />
                    <TextInput onChange={hendleChange} type='text' name='sergery' title='Surgery' placeholder='Surgery' />
                    <TextInput onChange={hendleChange} type='text' name='accident' title='Accident' placeholder='Accident' />
                    <TextInput onChange={hendleChange} type='text' name='other' title='Others' placeholder='Others' />
                    <TextInput onChange={hendleChange} type='text' name='familyMedicalHistory' title='Family Medical History' placeholder='Family Medical History' />
                    <TextInput onChange={hendleChange} type='text' name='currentMedicine' title='Current Medication' placeholder='Current Medication' />
                    <TextInput onChange={hendleChange} type='text' name='femalePregnancy' title='Female Pregnancy' placeholder='Female Pregnancy' />
                    <TextInput onChange={hendleChange} type='text' name='breastFeeding' title='Breast Feeding' placeholder='Breast Feeding' />
                    <TextInput onChange={hendleChange} type='text' name='healthInsureance' title='Health Insurance' placeholder='Health Insurance' />
                    <TextInput onChange={hendleChange} type='text' name='lowIncome' title='Low Income' placeholder='Low Income' />
                    <TextInput onChange={hendleChange} type='text' name='reference' title='Reference' placeholder='Reference' />
                    <TextInput onChange={hendleChange} type='radio' name='status' title='Status'
                        options={[{ label: 'active', value: 'active' }, { label: 'Deactive', value: 'Deactive' }]} />
                    <GreenButton onClick={hendleSaveCaseStudy} >Save</GreenButton>
                </Activity> }
            </Content>
        </Wrapper>
    )
}
export default Prescription;