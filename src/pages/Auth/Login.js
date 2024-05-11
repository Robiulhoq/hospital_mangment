import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { GreenButton } from '../../components/Buttons';
import { DataContext } from '../../ContextApi/DataContext';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading';

function Login({ setUserRole }) {
  const { hendleSetUserRole, userRole } = useContext(DataContext)
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  console.log(userRole);
  const hendleChange = (e) => {
    const updateLoginInfo = { ...loginInfo }
    updateLoginInfo[e.target.name] = e.target.value;
    setLoginInfo(updateLoginInfo);
  }
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('https://hospital-mangment.onrender.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      document.cookie = 'access_token=' + data.token;
      if (response.status === 200) {
        console.log(data.data.userRole);
        setUserRole(data.data.userRole);

      }
      setLoading(false);
      if (data.data.userRole == 'admin') {
        navigate('/');
      } else if (data.data.userRole == 'doctor') {
        navigate('/doctor/1');
      } else if (data.data.userRole == 'nurse') {
        navigate('/bed/1');
      } else if (data.data.userRole == 'accounted') {
        navigate('/finance/0');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      {
        loading ? <Loading /> :
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path d="M12 4.5V6M12 6V7.5M12 6H13.5M12 6H10.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" />
              <path d="M8.58579 2.58579C8 3.17157 8 4.11438 8 6C8 7.88562 8 8.82843 8.58579 9.41421C9.17157 10 10.1144 10 12 10C13.8856 10 14.8284 10 15.4142 9.41421C16 8.82843 16 7.88562 16 6C16 4.11438 16 3.17157 15.4142 2.58579C14.8284 2 13.8856 2 12 2C10.1144 2 9.17157 2 8.58579 2.58579Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4 22V11.9707C4 8.66123 4 7.00649 5.02513 5.97836C5.67665 5.32493 6.58055 5.08679 8 5M20 22V11.9707C20 8.66123 20 7.00649 18.9749 5.97836C18.3233 5.32493 17.4194 5.08679 16 5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3 22H21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9.5 22V19.5C9.5 18.5654 9.5 18.0981 9.70096 17.75C9.83261 17.522 10.022 17.3326 10.25 17.201C10.5981 17 11.0654 17 12 17C12.9346 17 13.4019 17 13.75 17.201C13.978 17.3326 14.1674 17.522 14.299 17.75C14.5 18.0981 14.5 18.5654 14.5 19.5V22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" />
              <path d="M8.00896 13H8M12 13H11.991M16.0011 13H15.9922" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h1>Demo hospital limited</h1>
            <p>Enter your email and password to log in.</p>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={hendleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={hendleChange}
                required
              />
            </div>
            <div className="submit_button">

              <GreenButton onClick={handleSubmit}>Login</GreenButton>
            </div>
          </div>
      }
      <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
        <li>admin@gmail.com</li>
        <li>123456</li>
        <li>doctor@gmail.com</li>
        <li>123456</li>
        <li>nurse@gmail.com</li>
        <li>123456</li>
        <li>accounted@gmail.com</li>
        <li>123456</li>
      </ul>

    </div>
  );
}

export default Login;
