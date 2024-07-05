import React from 'react';
import './Layout.css';
import Sidebar from './Sidebar'
import TopBar from './TopBar'

function Layout({title, component}) {
  return (
    <div className='container'>
        <div className="sidebar_contain">
            <Sidebar/>
        </div>
        <div className="contant_ar">
            <TopBar title={title}/>
            {
              component
            }
        </div>
    </div>
  )
}

export default Layout