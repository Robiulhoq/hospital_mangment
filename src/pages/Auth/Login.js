import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../ContextApi/DataContext";
import { GreenButton } from "../../components/Buttons";
import { Loading } from "../../components/Loading";
import Message from "../../components/Message";
import "./Login.css";

function Login({ setUserRole }) {
  const { hendleSetUserRole, userRole, setTigger } = useContext(DataContext);
  const [message, setMessage] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [type, setType] = useState("password");
  const hendleChangeType = () => {
    if (type === "password") setType("text");
    else setType("password");
  };
  const hendleChange = (e) => {
    const updateLoginInfo = { ...loginInfo };
    updateLoginInfo[e.target.name] = e.target.value;
    setLoginInfo(updateLoginInfo);
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        "https://hospital-mangment.onrender.com/auth/login",
        {
          method: "POST",
          body: JSON.stringify(loginInfo),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      document.cookie = "access_token=" + data.token;
      if (response.status === 200) {
        console.log(data.data.userRole);
        setUserRole(data.data.userRole);
        setTigger(true);
      }
      setLoading(false);
      if (data.data.userRole == "admin") {
        navigate("/");
      } else if (data.data.userRole == "doctor") {
        navigate("/doctor/1");
      } else if (data.data.userRole == "nurse") {
        navigate("/bed/1");
      } else if (data.data.userRole == "accounted") {
        navigate("/finance/0");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage("error");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="testing">
      <div className="login-container">
        <Message message={message} />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <img
              style={{ height: "100px", width: "100px" }}
              src="https://res.cloudinary.com/dv8sz8mml/image/upload/v1720700611/18246203_v987-18a_yhn1rd.jpg"
              alt=""
            />
            <h1>Hospital Managment</h1>
            <p>Enter your email and password to log in.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                {/* <label htmlFor="email">Email:</label> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  onChange={hendleChange}
                  required
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="password">Password:</label> */}
                <input
                  type={type}
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  onChange={hendleChange}
                  required
                  onKeyDown={handleKeyDown}
                />
                {type === "password" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    width="25px"
                    height="25px"
                    mergin-right="10px"
                    cursor="pointer"
                    onClick={hendleChangeType}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    width="25px"
                    height="25px"
                    mergin-right="10px"
                    cursor="pointer"
                    onClick={hendleChangeType}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </div>
              <div className="submit_button">
                <GreenButton type="submit">Login</GreenButton>
              </div>
            </form>
          </div>
        )}
        <ul style={{ listStyle: "none", marginTop: "1rem" }}>
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
    </div>
  );
}

export default Login;
