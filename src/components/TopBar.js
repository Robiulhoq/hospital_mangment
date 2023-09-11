import React, { useState } from 'react';
import './TopBar.css';
import { AiFillSetting } from 'react-icons/ai';
function TopBar({ title }) {
    const [profile, setProfile] = useState(false);
    const showProfile = () =>{
        if(profile == false){
            setProfile(true);
        } else{
            setProfile(false)
        }
    }
    function delete_cookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
    return (
        <>
        <div className='top_bar'>
            <h1>{title}</h1>
            <div className='profile'>
                <AiFillSetting size='2rem' onClick={showProfile}/>
            </div>
        </div>
        {
            profile == true?
            <ul className='profile_option'>
            <li onClick={(delete_cookie('access_token'))} ><a href="">Log Out</a></li>
        </ul>: null
        }
    </>
    )
}

export default TopBar