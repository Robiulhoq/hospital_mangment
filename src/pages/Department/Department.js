import React from 'react';
import './Department.css';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import Layout from '../../components/Layout';
import Input from '../../components/Input';

function Department() {
    return (
        <Layout title="Depatment" component={<DepartmentForm />}>
            
        </Layout>
    )
}

const DepartmentForm = () => {
    return (
        <div className="department_activity">
            <div className="button_group">
                <button>Depratment List</button>
            </div>
            <div className="input_area">
                <div className='input_item'>

                    <Input title="Department name" type="text" placeholder='Department name' />
                </div>
                <div className='input_item'>
                    <p>Drescription</p>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className='input_item'>
                    <p>Status</p>
                    <div className='checkbox' style={{ display: 'flex' }}>
                        <input type="checkbox" value='active' placeholder='Department name' />
                        <label htmlFor="">Active</label>
                        <input type="checkbox" value='active' placeholder='Department name' />
                        <label htmlFor="">Inactive</label>
                    </div>
                </div>
                <div className='input_item submit_button'>
                    <button>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Department