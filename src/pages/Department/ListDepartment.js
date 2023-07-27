import React from 'react'
import './ListDepartment.css';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
function ListDepartment() {
    return (
        <div className='list_department'>
            <div style={{ width: '250px' }}>
                <Sidebar />
            </div>
            <div style={{ width: '100%' }}>
                <TopBar title='List department' />
                <div className="list_department_activity">
                    <div className="shortcart_group">
                        <button className='btn btn_department'>+ Add Depratment</button>
                           <div>
                           <label htmlFor="">Show</label>
                        <select name="" id="">
                            <option value="">10</option>
                            <option value="">20</option>
                            <option value="">30</option>
                        </select>
                        <label htmlFor="">Entrys</label>
                           </div>
                        <div>
                        <label htmlFor="">Search</label>
                        <input type="text" placeholder='search' />
                        </div>
                    </div>
                    <table className='department_table'>
                        <tr>
                            <th>SL. NO</th>
                            <th>Department</th>
                            <th>Drescripton</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                            <td>Germany</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                            <td>Mexico</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                            <td>Austria</td>
                            <td><BiEdit size='1.5rem' color='darkblue' /> <AiFillDelete color='red' size='1.5rem' /></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListDepartment