import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlueButton, GreenButton } from '../../components/Buttons';
import { Activity, Content, SidebarContainer, Wrapper } from '../../components/Common';
import { Loading } from '../../components/Loading';
import Message from '../../components/Message';
import Sidebar from '../../components/Sidebar';
import TextInput from '../../components/TextInput';
import TopBar from '../../components/TopBar';
import { DataContext } from '../../ContextApi/DataContext';
import usePostrequiest from '../../hooks/usePostrequiest';
import usePutrequiest from '../../hooks/usePutrequiest';
import { getCookie } from '../../Utils/getCookie';
function Doctor({userRole}) {
    // context api && all custom hooks

    const { doctorList, editDoctorId, departmentList, tigger, setTigger } = useContext(DataContext);
    const [image, setImage] = useState(null);
    const doctorApi = 'https://hospital-mangment.onrender.com/doctor';
    const [doctor, setDoctor] = useState({
        fastName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        department: '',
        designation: '',
        address: '',
        phoneNo: '',
        picture: '',
        specialist: '',
        dathOfBirth: '',
        sex: 'Male',
        bloudGroup: 'A+',
        schedule: [],
        status: 'active'
    });
    const {loading, message, setMessage, hendleSaveData} = usePostrequiest(doctorApi, doctor, setTigger);
    
    // state manupulation

 
    const hendleChange = (e) => {
        const prevDoctor = {...doctor}
        prevDoctor[e.target.name] = e.target.value
        setDoctor(prevDoctor)
    };
    
    const hendleSetImage = (img) => {
        setImage(img)
    }
    // POST requiest for save docoter!

    const [imgmessage, setImgMessage] = useState('');
    const [imgloading, setImgLoading] = useState(false);

    const hendleImageUpload = async () =>{
        try {
            if(!image){
                setImgMessage('Please upload img file');
                return;
            }
           
            setImgLoading(true);
            const formData = new FormData();
            formData.append('my_file', image);
            const response = await axios.post('https://hospital-mangment.onrender.com/upload', formData);
            const updateDoctor = {...doctor}
            updateDoctor.picture = response.data.secure_url;
            setDoctor(updateDoctor)
            setImgLoading(false);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const handleSave = async () => {
            if (doctor.picture && !editDoctorId) {
                await hendleSaveData();
            }
        };
    
        handleSave();
    }, [doctor.picture, editDoctorId]);
    
    useEffect(() => {
        if (editDoctorId && doctorList) {
            const editDoctor = doctorList.find(item => item._id === editDoctorId);
            setDoctor({
                ...editDoctor
            });
            
        }
    }, [editDoctorId, doctorList]);

    const token = getCookie('access_token');
    const putApi = `https://hospital-mangment.onrender.com/doctor/${editDoctorId}`;
    const {putLoading, putMessage, hendleEdit} = usePutrequiest(putApi, doctor, setTigger);

    
  
    if(tigger){
        setInterval(()=>{
            setTigger(false);
        }, 100);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Doctor' />
                <Message message={message || imgmessage || putMessage} />
                {
                    loading || imgloading || putLoading? <Loading /> :
                        <Activity>
                            <Link to='/doctor/1' ><BlueButton>Doctor List</BlueButton></Link>
                           <form action="">
                            <TextInput required={true}  name='fastName' onChange={hendleChange} defaultValue={doctor.fastName} type='text' title='Fast Name' placeholder='Fast name' required={true} />
                            <TextInput required={true} name='lastName' onChange={hendleChange} defaultValue={doctor.lastName} type='text' title='Last Name' placeholder='Last name' />
                            <TextInput required={true} name='emailAddress' onChange={hendleChange} defaultValue={doctor.emailAddress} type='text' title='Email Name' placeholder='Email name' />
                            <TextInput required={true} name='password' onChange={hendleChange} defaultValue={doctor.password} type='text' title='Password' placeholder='Password' />
                            <TextInput required={true} name='designation' onChange={hendleChange} defaultValue={doctor.designation} type='text' title='Designation' placeholder='Designation' />
                            <TextInput required={true} name='department' onChange={hendleChange} defaultValue={doctor.department} type='radio' title='Department' options={departmentList.map(item => ({ label: item.departmentName, defaultValue: item.departmentName }))} />
                            <TextInput required={true} name='address' onChange={hendleChange} defaultValue={doctor.address} type='textarea' title='Address' placeholder='Address' />
                            <TextInput required={true} name='phoneNo' onChange={hendleChange} defaultValue={doctor.phoneNo} type='text' title='Phone No' placeholder='Phone No' />               
                            <TextInput required={true} onChange={hendleSetImage} name='picture' type='file' title='Picture' />
                            <TextInput required={true} name='specialist' onChange={hendleChange} defaultValue={doctor.specialist} type='text' title='Specialist' placeholder='Specialist' />
                            <TextInput required={true} name='dathOfBirth' onChange={hendleChange} defaultValue={doctor.dathOfBirth} type='text' title='Dath of Birth' placeholder='Dath of Birth' />
                            <TextInput required={true} name='sex' onChange={hendleChange} defaultValue={doctor.sex} type='radio' title='Sex' options={[{ label: 'Male', defaultValue: 'Male' }, { label: 'Female', defaultValue: 'Female' }]} />
                            <TextInput required={true} name='bloudGroup' onChange={hendleChange} defaultValue={doctor.bloudGroup} type='radio' title='Bloud Group' options={[{ label: 'A+', defaultValue: 'A+' },
                            { label: 'A-', defaultValue: 'A-' },
                            { label: 'B+', defaultValue: 'B+' },
                            { label: 'B-', defaultValue: 'B-' },
                            { label: 'o+', defaultValue: 'o+' }
                            ]} />
                            
                            <TextInput required={true} name='status' onChange={hendleChange} defaultValue={doctor.status} type='radio' title='Status' 
                            options={[{label: 'Active', defaultValue: 'Active'},{label: 'Deactive', defaultValue: 'Deactive'}]} />
                            <GreenButton onClick={ editDoctorId? hendleEdit: hendleImageUpload}>Save</GreenButton>
                            </form>
                        </Activity>

                }

            </Content>
        </Wrapper>
    )
}

export default Doctor