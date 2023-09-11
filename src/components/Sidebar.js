import React, { useState } from 'react'
import './Sidebar.css';
import { IconContext } from 'react-icons';
import {
  AiFillAccountBook, AiFillCodepenCircle, AiFillMedicineBox, AiFillFrown,
  AiOutlineCalendar, AiOutlineCheckSquare, AiOutlineBook, AiFillIdcard, AiOutlineMail, AiOutlineLeft, AiOutlineDown
} from "react-icons/ai";
import { FaUserDoctor, FaMoneyBillWave, FaBed } from 'react-icons/fa';
import { GiHypodermicTest, GiMedicines } from 'react-icons/gi';
import sidebar_option from '../Data/Sidebar_option.json';
import { Link } from 'react-router-dom';
function Sidebar({userRole}) {
  
  const [option, setOption] = useState(sidebar_option);
  const expanedSubItem = (index) => {
    const copyOption = { ...option }
    copyOption[index].state = !copyOption[index].state;
    setOption(copyOption);

  }
  const admin = false;
  // const userRole = "admin";
  return (
    <div className='sidebar_container'>
      <div className="logo_container">
        <div>
          <h3>Demo hospital Ltd</h3>
          <img src="https://picsum.photos/100/100" alt="" />
        </div>
      </div>
      <div className="sidebar">
        <ul>
          {
            sidebar_option.map((item, index) => {
              if (item.access.includes(userRole)) {
                return (
                  <li key={index} onClick={() => expanedSubItem(index)} className='list_item'>

                    <a href="#"><span> <IconContext.Provider value={{ size: '1rem' }}>
                      {renderIcon(item.icon)}
                    </IconContext.Provider ><span className='title'>{item.option}</span></span>

                      {
                        item.state == false ?
                          <span className='expended_icon'><AiOutlineLeft /></span> :
                          <span className='expended_icon'><AiOutlineDown /></span>
                      }
                    </a>


                    {
                      item.state == true ?
                        item.subOption.map((subItem, idx) => <Link className='sub_title' to={subItem.path} >{subItem.title}</Link>) : null
                    }
                  </li>
                )
              }

            }


            )

          }
        </ul>
      </div>
    </div>

  )
}
const renderIcon = (iconName) => {
  switch (iconName) {
    case 'AiFillAccountBook':
      return <AiFillAccountBook />;
    case 'AiFillCodepenCircle':
      return <AiFillCodepenCircle />;
    case 'AiFillMedicineBox':
      return <AiFillMedicineBox />;
    case 'AiFillFrown':
      return <AiFillFrown />;
    case 'AiOutlineCalendar':
      return <AiOutlineCalendar />;
    case 'AiOutlineCheckSquare':
      return <AiOutlineCheckSquare />;
    case 'AiOutlineBook':
      return <AiOutlineBook />;
    case 'AiFillIdcard':
      return <AiFillIdcard />;
    case 'AiOutlineMail':
      return <AiOutlineMail />;
    case 'GiHypodermicTest':
      return <GiHypodermicTest />;
    case 'GiMedicines':
      return <GiMedicines />;
    case 'FaBed':
      return <FaBed />;
    case 'FaMoneyBillWave':
      return <FaMoneyBillWave />;
    default:
      return null;
  }
};
export default Sidebar