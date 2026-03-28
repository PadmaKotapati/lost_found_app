import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {registerNewUser} from "../../Services/LoginService";
import '../../DisplayView.css';
const RegisterUser=()=>{
    const [lostFoundUser,setLostFoundUser] = useState({
        username:"",
        password: "",
        personalName:"",
        email:"",
        role:"",
    });
  const [flag,setFlag]=useState(false);
  const [confirmPassword,setConfirmPassword]=useState("");
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const createNewUser = (event) => {
    event.preventDefault();
       if(lostFoundUser.password===confirmPassword){
         registerNewUser(lostFoundUser).then((response)=>{
          setFlag(true);
         });
    }
 };
 useEffect(() => {
  setFlag(false);
}, []);
const  onChangeHandler = (event) =>{
    event.persist();
    setFlag(false);
    const name = event.target.name;
        const value = event.target.value;
       setLostFoundUser(values =>({...values, [name]: value }));
   };
 
   const returnBack=()=>{
    navigate('/');
   }
   const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;
 
    if (!lostFoundUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }
 
    if (!lostFoundUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }
    else if (lostFoundUser.password.length < 5 || lostFoundUser.passwordlength > 10) {
       tempErrors.password="Password must be 5-10 characters long";
      isValid = false;
    }
    else if (lostFoundUser.password!==confirmPassword) {
      tempErrors.password="Both the passwords are not matched";
     isValid = false;
   }
 
  if (!lostFoundUser.personalName.trim()) {
        tempErrors.personalName = "Personal Name is required";
        isValid = false;
    }
if (!lostFoundUser.email.trim()) {
        tempErrors.email = "Email is required";
        isValid = false;
      }
      else if(!emailPattern.test(lostFoundUser.email)){
        tempErrors.email = "Invalid Email Format";
        isValid = false;
      }
    if (!lostFoundUser.role.trim()) {
        tempErrors.role = "Role is required";
        isValid = false;
      }
      if (!confirmPassword.trim()) {
        tempErrors.confirmPassword = "Confirm Password is required";
        isValid = false;
      }
 
   setErrors(tempErrors);
    if (isValid) {
        createNewUser(event);
    }
  };
return (
  <div className="login-wrapper">
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card login-card shadow-lg">
        <div className="card-body">

          <h3 className="text-center mb-4 title-text">
            <u style={{ color: "#ff1493" }}>New User Registration</u>
          </h3>

          <form>

            <div className="form-group mb-3">
              <label>User Name</label>
              <input
                placeholder="username"
                name="username"
                className="form-control custom-input"
                value={lostFoundUser.username}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.username && <p className="error-text">{errors.username}</p>}
            </div>

            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control custom-input"
                value={lostFoundUser.password}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <div className="form-group mb-3">
              <label>Retype Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control custom-input"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="form-group mb-3">
              <label>Personal Name</label>
              <input
                placeholder="personal name"
                name="personalName"
                className="form-control custom-input"
                value={lostFoundUser.personalName}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.personalName && (
                <p className="error-text">{errors.personalName}</p>
              )}
            </div>

            <div className="form-group mb-3">
              <label>Email</label>
              <input
                placeholder="email"
                name="email"
                className="form-control custom-input"
                value={lostFoundUser.email}
                onChange={(event) => onChangeHandler(event)}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group mb-3">
              <label>Select Role</label>
              <select
                name="role"
                className="form-control custom-input"
                value={lostFoundUser.role}
                onChange={(event) => onChangeHandler(event)}
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>
              {errors.role && <p className="error-text">{errors.role}</p>}
            </div>

            <button
              type="button"
              className="btn login-btn w-100"
              onClick={handleValidation}
            >
              Register
            </button>

          </form>

          {flag && (
            <p className="success-text text-center mt-3">
              New User Created...
              <br />
              <button className="btn btn-success mt-2" onClick={returnBack}>
                Go To Login
              </button>
            </p>
          )}

        </div>
      </div>
    </div>
  </div>
);
}
export default RegisterUser