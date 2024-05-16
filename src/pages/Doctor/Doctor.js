import React, { useState, useRef, useContext, useEffect } from 'react';
import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import { Wrapper, SidebarContainer, Content, Activity } from '../../components/Common';
import { BlueButton, GreenButton } from '../../components/Buttons';
import TextInput from '../../components/TextInput';
import Tinymac from '../../components/Tinymac';
import { DataContext } from '../../ContextApi/DataContext';
import Message from '../../components/Message';
import axios from 'axios';
import { Loading } from '../../components/Loading';
import { getCookie } from '../../Utils/getCookie';
import { Link } from 'react-router-dom';

function Doctor({userRole}) {
    const [loading, setLoading] = useState(false);
    // load doctor api data form server and store it context api. use context api data

    const { hendleDoctorUI, doctorList, editDoctorId, departmentList } = useContext(DataContext);

    const [message, setMessage] = useState('');
    // useRef for text editor referance

    const editorRef = useRef();

    const [image, setImage] = useState(null);
    const hendleSetImage = (img) => {
        setImage(img)
    }

    // input field state
    const [doctor, setDoctor] = useState({
        fastName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        department: '',
        designation: '',
        address: '',
        phoneNo: '',
        shortBiography: '',
        picture: '',
        specialist: '',
        dathOfBirth: '',
        sex: 'Male',
        bloudGroup: 'A+',
        education: '',
        schedule: [],
        status: 'active'
    });
   console.log(doctor);
    // store input change data in state
    const hendleChange = (e) => {
        const updateDoctor = { ...doctor }
        updateDoctor[e.target.name] = e.target.value;
        setDoctor(updateDoctor);
    }
    // store tiny mac change data in state
    const hendletinychange = (content) => {
        setDoctor(prevDoctor => ({
            ...prevDoctor,
            shortBiography: content,
            education: content, // You can adjust this as needed
        }));
    }
    // show data save message

    // data edit state. if true data will be edit
    const [editMode, setEditMode] = useState(false);
    //  edit avabile data show in input field
    useEffect(() => {
        if (editDoctorId && doctorList) {
            const editDoctor = doctorList.find(item => item._id === editDoctorId);
            // Find the doctor in doctorList based on editDoctorId

            // Set the component state to the values of the found department
            setDoctor({
                fastName: editDoctor.fastName,
                lastName: editDoctor.lastName,
                emailAddress: editDoctor.emailAddress,
                password: editDoctor.password,
                designation: editDoctor.designation,
                address: editDoctor.address,
                phoneNo: editDoctor.phoneNo,
                shortBiography: editDoctor.ortBiography,
                picture: editDoctor.picture,
                specialist: editDoctor.specialist,
                dathOfBirth: editDoctor.dathOfBirth,
                sex: editDoctor.sex,
                bloudGroup: editDoctor.bloudGroup,
                education: editDoctor.education,
                status: editDoctor.status
            });
            setEditMode(true);
        }
    }, [editDoctorId, doctorList]);
    // data save and edit function


    const hendleImageUpload = async () => {

        try {
            if(image == null){
                setMessage('Please upload img file');
                return;
            }
            const values = Object.values(doctor);
            if (values.some(value => !value.trim())) {
                setMessage("Please fill out all fields");
                setLoading(false);
                return;
            }
            setLoading(true);
            const formData = new FormData();
            formData.append('my_file', image);
            const response = await axios.post('https://hospital-mangment.onrender.com/upload', formData);
            const updateDoctor = { ...doctor }
            updateDoctor.picture = response.data.secure_url;
            setDoctor(updateDoctor);

        } catch (error) {
            console.error(error);
        }


    }
    const token = getCookie('access_token');
    
    const hendleSaveDoctor = async () => {

        try {
            setLoading(true);
            const response = await fetch('https://hospital-mangment.onrender.com/doctor', {
                method: 'POST',
                body: JSON.stringify(doctor),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` }
            });
            hendleDoctorUI(true);
            if (response.status === 200) {
                response.message = "Doctor Save successfull"
                setMessage(response.message);
                setLoading(false)
                setDoctor(prevDoctor => ({
                    ...prevDoctor,
                    fastName: '',
                    lastName: '',
                    emailAddress: '',
                    password: '',
                    department: '',
                    designation: '',
                    address: '',
                    phoneNo: '',
                    shortBiography: '',
                    picture: '',
                    specialist: '',
                    dathOfBirth: '',
                    sex: 'Male',
                    bloudGroup: 'A+',
                    education: '',
                    schedule: [],
                    status: 'active'
                }));
                
            } else {
                console.log(response.statusText);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        if (doctor.picture && !editDoctorId) {
            hendleSaveDoctor();
        }

    }, [doctor.picture])
    
    const hendleEditDoctor = async () => {
        
        try {
            setLoading(true)
            const response = await fetch(`https://hospital-mangment.onrender.com/doctor/${editDoctorId}`, {
                method: 'PUT',
                body: JSON.stringify(doctor),
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            });
            hendleDoctorUI(true);
            response.message = 'Doctor edit successfull';
            setMessage(response.message);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    // Show event message in user
    if (message) {
        setInterval(() => {
            setMessage('');
            hendleDoctorUI(false)
        }, 5000);
    }
    return (
        <Wrapper>
            <SidebarContainer>
                <Sidebar userRole={userRole} />
            </SidebarContainer>
            <Content >
                <TopBar title='Doctor' />
                <Message message={message} />
                {
                    loading ? <Loading /> :
                        <Activity>
                            <Link to='/doctor/1' ><BlueButton>Doctor List</BlueButton></Link>
                            <TextInput name='fastName' onChange={hendleChange} defaultValue={doctor.fastName} type='text' title='Fast Name' placeholder='Fast name' />
                            <TextInput name='lastName' onChange={hendleChange} defaultValue={doctor.lastName} type='text' title='Last Name' placeholder='Last name' />
                            <TextInput name='emailAddress' onChange={hendleChange} defaultValue={doctor.emailAddress} type='text' title='Email Name' placeholder='Email name' />
                            <TextInput name='password' onChange={hendleChange} defaultValue={doctor.password} type='text' title='Password' placeholder='Password' />
                            <TextInput name='designation' onChange={hendleChange} defaultValue={doctor.designation} type='text' title='Designation' placeholder='Designation' />

                            <TextInput name='department' onChange={hendleChange} value={doctor.department} type='radio' title='Department' options={departmentList.map(item => ({ label: item.departmentName, value: item.departmentName }))} />


                            <TextInput name='address' onChange={hendleChange} defaultValue={doctor.address} type='textarea' title='Address' placeholder='Address' />
                            <TextInput name='phoneNo' onChange={hendleChange} defaultValue={doctor.phoneNo} type='text' title='Phone No' placeholder='Phone No' />
                            <Tinymac editorRef={editorRef} defaultValue={doctor.shortBiography} onChange={hendletinychange} title='Short Biography' />


                            <TextInput onChange={hendleSetImage} name='picture' type='file' title='Picture' />
                            <TextInput name='specialist' onChange={hendleChange} defaultValue={doctor.specialist} type='text' title='Specialist' placeholder='Specialist' />
                            <TextInput name='dathOfBirth' onChange={hendleChange} defaultValue={doctor.dathOfBirth} type='text' title='Dath of Birth' placeholder='Dath of Birth' />
                            <TextInput name='sex' onChange={hendleChange} value={doctor.sex} type='radio' title='Sex' options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]} />
                            <TextInput name='bloudGroup' onChange={hendleChange} value={doctor.bloudGroup} type='radio' title='Bloud Group' options={[{ label: 'A+', value: 'A+' },
                            { label: 'A-', value: 'A-' },
                            { label: 'B+', value: 'B+' },
                            { label: 'B-', value: 'B-' },
                            { label: 'o+', value: 'o+' }
                            ]} />
                            <Tinymac editorRef={editorRef} name='education' defaultValue={doctor.education} onChange={hendletinychange} title='Education/Degree' />
                            <TextInput name='status' onChange={hendleChange} value={doctor.status} type='radio' title='Status' 
                            options={[{label: 'Active', value: 'Active'},{label: 'Deactive', value: 'Deactive'}]} />
                            <GreenButton onClick={editMode ? hendleEditDoctor : hendleImageUpload}>Save</GreenButton>
                        </Activity>

                }

            </Content>
        </Wrapper>
    )
}

export default Doctor