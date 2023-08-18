import React, { useState } from "react";
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";

function AddPrescription(){
    const [totalMedicine, setTotalMedicine] = useState(1);
    const [medicine, setMedicine] = useState(['paracetamol']); // Initial medicine state with one input

    const handleAddMedicine = () => {
        setTotalMedicine(totalMedicine + 1);
        setMedicine([...medicine, '']); // Add an empty medicine input
    };

    const handleRemoveMedicine = () => {
        if (totalMedicine > 1) {
            setTotalMedicine(totalMedicine - 1);
            setMedicine(medicine.slice(0, -1)); // Remove the last medicine input
        }
    };

    const handleMedicineChange = (index, value) => {
        const updatedMedicine = [...medicine];
        updatedMedicine[index] = value;
        setMedicine(updatedMedicine);
    };

    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content >
                <TopBar title='Add Prescription' />
                <Activity>
                    <TextInput type='text' title='Patient ID' placeholder='Patient ID'/>
                    {medicine.map((medicineValue, index) => (
                        <TextInput
                            type='text'
                            key={index}
                            title={`Medicine ${index + 1}`}
                            placeholder='Add Medicine'
                            value={medicineValue}
                            onChange={(e) => handleMedicineChange(index, e.target.value)}
                        />
                    ))}
                    <div style={{ marginLeft: '43.5rem', marginTop: '-1.5rem' }}>
                        <GreenButton onClick={handleAddMedicine}>Add</GreenButton>
                        <BlueButton onClick={handleRemoveMedicine}>Remove</BlueButton>
                    </div>
                    <TextInput type='textarea' title='Diagnosis' placeholder='Add Diagnosis' />
                    <TextInput type='radio' title='Status' options={['Active', 'Deactive']} />
                    <GreenButton>Save</GreenButton>
                </Activity>
            </Content>
        </Wrapper>
    )
}

export default AddPrescription;
