import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";

const LoginPage = () => {

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [flag, setFlag] = useState(true);

  const validateLogin = (e) => {
    e.preventDefault();

   validateUser(loginData.username, loginData.password)
  .then((response) => {

    let role = String(response.data);

    if (role === "Admin") {
      localStorage.setItem("username", loginData.username);
      navigate("/admin-menu");
    } else if (role === "Student") {
      localStorage.setItem("username", loginData.username);
      navigate("/student-menu");
    } else {
      setFlag(false);
    }

  })
  .catch((error) => {
    console.log(error);
    setFlag(false);
  });

  };

  const onChangeHandler = (event) => {
    setFlag(true);
    const { name, value } = event.target;
    setLoginData((values) => ({ ...values, [name]: value }));
  };

  const handleValidation = (event) => {

    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!loginData.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!loginData.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      validateLogin(event);
    }

  };

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}
    >

      {/* Dark overlay for better visibility */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.45)"
        }}
      ></div>

      {/* Login Card */}
      <div
        style={{
          width: "380px",
          padding: "40px",
          borderRadius: "12px",
          backgroundColor: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          position: "relative",
          zIndex: 2
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#111827"
          }}
        >
          Campus Lost & Found
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#6B7280",
            fontSize: "14px"
          }}
        >
          Smart Campus Item Recovery System
        </p>

        <form>

          <div style={{ marginBottom: "18px" }}>

            <label>Username</label>

            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={onChangeHandler}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB"
              }}
            />

            {errors.username &&
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.username}
              </p>
            }

          </div>

          <div style={{ marginBottom: "20px" }}>

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={onChangeHandler}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "6px",
                border: "1px solid #D1D5DB"
              }}
            />

            {errors.password &&
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.password}
              </p>
            }

          </div>

          <button
            type="button"
            onClick={handleValidation}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#111827",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Sign In
          </button>

        </form>

        {!flag &&
          <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
            Invalid Username or Password
          </p>
        }

        <p
          onClick={() => navigate("/register")}
          style={{
            marginTop: "20px",
            fontSize: "14px",
            textAlign: "center",
            color: "#2563EB",
            cursor: "pointer"
          }}
        >
          Don't have an account? Register
        </p>

      </div>

    </div>
  );
};

export default LoginPage;