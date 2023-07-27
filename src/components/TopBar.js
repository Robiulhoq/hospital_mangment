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
            <li><a href="">Profile</a></li>
            <li><a href="">Edit Profile</a></li>
            <li><a href="">Log Out</a></li>
        </ul>: null
        }
    </>
    )
}

export default TopBar