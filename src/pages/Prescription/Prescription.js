import React from "react";  
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
function Prescription(){

    return(
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Prescription' />
                <Activity>
                    <TextInput type='text' title='Patient ID' placeholder='Patient ID'/>
                    <TextInput type='text' title='Food Allergies' placeholder='Food Allergies' />
                    <TextInput type='text' title='Tendency Bleed' placeholder='Tendency Bleed' />
                    <TextInput type='text' title='Heart Disease' placeholder='Heart Disease' />
                    <TextInput type='text' title='High Blood Pressure' placeholder='High Blood Pressure' />
                    <TextInput type='text' title='Diabetic' placeholder='Diabetic' />
                    <TextInput type='text' title='Surgery' placeholder='Surgery' />
                    <TextInput type='text' title='Accident' placeholder='Accident' />
                    <TextInput type='text' title='Others' placeholder='Others' />
                    <TextInput type='text' title='Family Medical History' placeholder='Family Medical History' />
                    <TextInput type='text' title='Current Medication' placeholder='Current Medication' />
                    <TextInput type='text' title='Female Pregnancy' placeholder='Female Pregnancy' />
                    <TextInput type='text' title='Breast Feeding' placeholder='Breast Feeding' />
                    <TextInput type='text' title='Health Insurance' placeholder='Health Insurance' />
                    <TextInput type='text' title='Low Income' placeholder='Low Income' />
                    <TextInput type='text' title='Reference' placeholder='Reference' />
                    <TextInput type='radio' title='Status' options={['Active', 'Deactive']} />
                    <GreenButton>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}
export default Prescription;