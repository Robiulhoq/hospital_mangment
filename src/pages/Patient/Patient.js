import React from 'react'
import './Patient.css';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import Input from '../../components/Input';
function Patient() {
  return (
    <div className='patient'>
        <div style={{width: '250px'}}>
            <Sidebar/>
        </div>
        <div style={{width: '100%'}}>
            <TopBar title='Add Patient'/>
            <div className="add_patient_container">
                <div className="add_patient">
                <Input name='name' title='Fast Name' placeholder='Fast name' />
                        <Input title='Last Name' placeholder='Last name' />
                        <Input name='email' title='Email address' placeholder='Email address' />
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
                        <Input title='Picture' type='file' placeholder='Dath of birth' />
                        <Input title='Address' type='textarea' placeholder='Address' />
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
                        <button className='btn btn_department'>Save</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Patient