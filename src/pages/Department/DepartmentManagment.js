import React, { useEffect, useState } from 'react';
import Department from './Department';
import ListDepartment from './ListDepartment';


const DepartmentManagment = () => {

    const [departmentList, setDepartmentList] = useState([]);
    const [editDepartmentId, setEditDepartmentId] = useState(null);

    useEffect(() =>  {
        fetch('http://localhost:5000/department')
            .then(res => res.json())
            .then(data => setDepartmentList(data))
    }, []);
    console.log(departmentList);
    const handleEditDepartment = (id) => {
        setEditDepartmentId(id);
    };
    return (
        <div>
            <Department
                departmentList={departmentList}
                setDepartmentList={setDepartmentList}
                editDepartmentId={editDepartmentId}
                setEditDepartmentId={setEditDepartmentId} />
            <ListDepartment
                departmentList={departmentList}
                handleEditDepartment={handleEditDepartment}
            />
        </div>
    )
}

export default DepartmentManagment;