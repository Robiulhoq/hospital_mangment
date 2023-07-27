import React, { useRef } from 'react'
import './AddPatientDoc.css';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import Input from '../../components/Input';
import { Editor } from '@tinymce/tinymce-react';
function AddPatientDoc() {
    const editorRef = useRef();
    return (
        <div className='patient'>
            <div style={{ width: '250px' }}>
                <Sidebar />
            </div>
            <div style={{ width: '100%' }}>
                <TopBar title='Add Document' />
                <div className="add_patient_container">
                    <div className="add_patient">
                        <Input name='name' title='Patient ID' placeholder='Patient ID' />
                        <Input title='Attatch File' type='file' placeholder='Last name' />
                        <Input name='email' title='Doctor Name' placeholder='Doctor Name' />
                        <div className='tinymac'>
                            <p>Description</p>
                            <div>
                                <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                />
                            </div>
                        </div>
                        <button className='btn btn_department'>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPatientDoc;