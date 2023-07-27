import React, { useState, useRef } from 'react';
import './Doctor.css';
import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import Input from '../../components/Input';
 import { Editor } from '@tinymce/tinymce-react';
function Doctor() {
    const editorRef = useRef();
    const [inputValue, setInputValue] = useState({
        name: '',
        email: ''
    });
    console.log(inputValue);
    const hendleChange = (e) => {
        const value = { ...inputValue }
        value[e.target.name] = e.target.value;
        setInputValue(value);
    }
    const hendletinySubmit = () =>{
        console.log(editorRef.current.getContent());
    }
    return (
        <div className='doctor'>
            <div style={{ width: '250px' }}>
                <Sidebar />
            </div>
            <div style={{ width: '100%' }}>
                <TopBar title='Doctor' />
                <div className="add_doctor_container">
                    <div className="add_doctor">

                        <Input name='name' onChange={hendleChange} title='Fast Name' placeholder='Fast name' />
                        <Input title='Last Name' placeholder='Last name' />
                        <Input name='email' onChange={hendleChange} title='Email address' placeholder='Email address' />
                        <Input title='Password' placeholder='Password' />
                        <Input title='Mobile No' placeholder='Mobile no' />
                        <Input title='Blood group' placeholder='Blood grop' />
                        <Input title='Date of birth' placeholder='Dath of birth' />
                        <div className="sex_checkbox">
                            <p>Sex</p>
                            <div >
                                <label className='checkbox' htmlFor="">Male
                                    <input type="checkbox" value='active' />
                                </label>
                                <label className='checkbox' htmlFor="">Female
                                    <input type="checkbox" value='active' />
                                </label>
                                <label className='checkbox' htmlFor="">Other
                                    <input type="checkbox" value='active' />
                                </label>

                            </div>
                        </div>
                        
                        <div className='tinymac'>
                            <p>Short Biography</p>
                            <div>
                                <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                />
                            </div>
                        </div>
                        <Input title='Specialist' placeholder='Specialist' />
                        <Input title='Designation' placeholder='Designation' />
                        <Input title='Picture' placeholder='Designation' type='file' />
                        <div className='tinymac'>
                            <p>Education/Degree</p>
                            <div>
                                <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                />
                            </div>
                        </div>
                        <div className="sex_checkbox">
                            <p>Status</p>
                            <div >
                                <label className='checkbox' htmlFor="">Active
                                    <input type="checkbox" value='active' />
                                </label>
                                <label className='checkbox' htmlFor="">Deactive
                                    <input type="checkbox" value='active' />
                                </label>
                                

                            </div>
                        </div>
                        <div>
                        
                        </div>
                        <button onClick={hendletinySubmit}>submit</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Doctor