import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { GreenButton } from '../../components/Buttons';
import { DataContext } from '../../ContextApi/DataContext';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading';
function Login({setUserRole}) {
const {hendleSetUserRole, userRole} = useContext(DataContext)
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
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      document.cookie = 'access_token=' + data.token;
      if(response.status === 200){
        console.log(data.data.userRole);
        setUserRole(data.data.userRole);
        
      }
      setLoading(false);
      if(data.data.userRole == 'admin'){
        navigate('/');
      }else if(data.data.userRole == 'doctor'){
        navigate('/doctor/1');
      } else if(data.data.userRole == 'nurse'){
        navigate('/bed/1');
      }else if(data.data.userRole == 'accounted'){
        navigate('/finance/0');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      {
        loading? <Loading />:
        <div>
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
      <div className="form-group">

        <GreenButton onClick={handleSubmit}>Login</GreenButton>
      </div>
      </div>
      }
      <ul style={{listStyle: 'none'}}>
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
