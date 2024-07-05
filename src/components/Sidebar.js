import React, { useState } from 'react'
import './Sidebar.css';
import {
  AiFillAccountBook, AiFillCodepenCircle, AiFillMedicineBox, AiFillFrown,
  AiOutlineCalendar, AiOutlineCheckSquare, AiOutlineBook, AiFillIdcard, AiOutlineMail, AiOutlineLeft, AiOutlineDown
} from "react-icons/ai";
import { FaUserDoctor, FaHospitalUser, FaMoneyBillWave, FaBed } from 'react-icons/fa';
import { GiHypodermicTest, GiMedicines } from 'react-icons/gi';
import { Link } from 'react-router-dom';

function Sidebar({ userRole }) {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [elementId, setElementId] = useState();

  function isToggleDropdown(id) {
    setElementId(id);
    setIsDropdownOpen(true)

  }


  const sidebar_option = [
    {
      name: 'Dashboard',
      icon: <AiFillAccountBook/>,
      subItemName: [
        {
          title: 'Back',
          path: '/'
        }
      ],
      access: ['admin'],
      state: false
    },
    {
      name: 'Department',
      icon: <AiFillCodepenCircle/>,
      subItemName: [
        {
          title: 'Add Department',
          path: '/department/0'
        },
        {
          title: 'List Department',
          path: '/department/1'
        }
      ],
      access: ['admin'],
      path: '/department',
      state: false
    },
    {
      name: 'Doctor',
      icon: <AiFillMedicineBox/>,
      subItemName: [
        {
          title: 'Add Doctor',
          path: '/doctor/0'
        },
        {
          title: 'List Doctor',
          path: '/doctor/1'
        }
      ],
      access: ['admin', 'doctor'],
      state: false
    },
    {
      name: 'Patient',
      icon: <AiFillFrown/>,
      subItemName: [
        {
          title: 'Add patient',
          path: '/patient/0'
        },
        {
          title: 'List patient',
          path: '/patient/1'
        }
      ],
      access: ['admin', 'doctor'],
      state: false
    },
    {
      name: 'Schedule',
      icon: <AiOutlineCalendar/>,
      subItemName: [
        {
          title: 'Add Schedule',
          path: '/schedule/0'
        },
        {
          title: 'List Schedule',
          path: '/schedule/1'
        }
      ],
      access: ['admin', 'doctor'],
      state: false
    },
    {
      name: 'Appoinment',
      icon: <AiOutlineCheckSquare/>,
      subItemName: [
        {
          title: 'Add Appoinment',
          path: '/appoinment/0'
        },
        {
          title: 'List Appoinment',
          path: '/appoinment/1'
        }
      ],
      access: ['admin', 'doctor'],
      state: false
    },
    {
      name: 'Prescription',
      icon: <AiOutlineBook/>,
      subItemName: [
        {
          title: 'Add Case Study',
          path: '/prescription/0'
        },
        {
          title: 'List Case Study',
          path: '/prescription/1'
        },
        {
          title: 'Add Prescription',
          path: '/prescription/2'
        },
        {
          title: 'Print Prescription',
          path: '/prescription/3'
        }
      ],
      access: ['admin', 'doctor'],
      state: false
    },
    {
      name: 'Finance',
      icon: <FaMoneyBillWave/>,
      subItemName: [
        {
          title: 'Add invoice',
          path: '/finance/0'
        },
        {
          title: 'List invoice',
          path: '/finance/1'
        },
        {
          title: 'Add account',
          path: '/finance/2'
        },
        {
          title: 'List account',
          path: '/finance/3'
        },
        {
          title: 'Add Payment',
          path: '/finance/4'
        },
        {
          title: 'Payment List',
          path: '/finance/5'
        }
      ],
      access: ['admin', 'accounted'],
      state: false
    },
    {
      name: 'Lab test',
      icon: <GiHypodermicTest/>,
      subItemName: [
        {
          title: 'Add Report',
          path: '/labtest/0'
        },
        {
          title: 'List Report',
          path: '/labtest/1'
        }
      ],
      access: ['admin', 'doctor'],
      state: false
    },
    {
      name: 'Human resource',
      icon: <AiFillIdcard/>,
      subItemName: [
        {
          title: 'Add employ',
          path: '/hr/0'
        },
        {
          title: 'List employ',
          path: '/hr/1'
        },
        {
          title: 'payment',
          path: '/hr/2'
        }
      ],
      access: ['admin'],
      state: false
    },
    {
      name: 'Medicine',
      icon: <GiMedicines/>,
      subItemName: [
        {
          title: 'Add medicine',
          path: '/medicine/0'
        },
        {
          title: 'Medicine List',
          path: '/medicine/1'
        }
      ],
      access: ['admin'],
      state: false
    },
    {
      name: 'Bed manager',
      icon: <FaBed/>,
      subItemName: [
        {
          title: 'Add bed',
          path: '/bed/0'
        },
        {
          title: 'Bed List',
          path: '/bed/1'
        },
        {
          title: 'Assign bed',
          path: '/bed/2'
        },
        {
          title: 'Assign Bed List',
          path: '/bed/3'
        }
      ],
      access: ['admin', 'nurse'],
      state: false
    }
  ];
  
  return (
    <div className='sidebar_container'>
      <div className='logo_container'>
        <h2>Hospital managmet</h2>
        <img src="https://picsum.photos/100/100" alt="" />
      </div>
      {sidebar_option.map((item, index) => {


        return <div className='button_group' key={index}>
          {
            item.access.includes(userRole) ?
              <div className='dashboard_button' onClick={() => isToggleDropdown(index)}>

               <span>{item.icon} <span className='icon_align'></span> {item.name}</span><span>{isDropdownOpen && elementId == index ?<AiOutlineDown></AiOutlineDown>:<AiOutlineLeft/>}</span>
                
                </div> : null
          }

          <div className="dropdown_content">

            {isDropdownOpen && elementId == index ?
              item.subItemName.map(subItem => <Link to={subItem.path} >{subItem.title}</Link>) : null
            }

          </div>
        </div>
      })

      }

    </div>

  )
}
export default Sidebar;