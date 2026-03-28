import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {

  const username = localStorage.getItem("username"); // ✅ get logged user

  const [user, setUser] = useState({
    personalName: "",
    email: ""
  });

  // 🔹 Fetch user data
  useEffect(() => {
    axios.get(`http://localhost:9595/lostfound/profile/${username}`)
      .then(res => {
        setUser({
          personalName: res.data.personalName || "",
          email: res.data.email || ""
        });
      })
      .catch(err => {
        console.error(err);
        alert("Failed to load profile ❌");
      });
  }, [username]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Update profile
  const handleUpdate = () => {

    if (!user.personalName || !user.email) {
      alert("All fields are required ❌");
      return;
    }

    axios.put(
      `http://localhost:9595/lostfound/profile/${username}`,
      {
        personalName: user.personalName,
        email: user.email
      }
    )
    .then(() => {
      alert("Profile updated successfully ✅");
    })
    .catch(err => {
      console.error(err);
      alert("Update failed ❌");
    });
  };

  return (
    <div className="profile-container">

      <div className="profile-card">
        <h2>👤 My Profile</h2>

        {/* Name */}
        <div className="profile-field">
          <label>Name</label>
          <input
            type="text"
            name="personalName"   // ✅ FIXED
            value={user.personalName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="profile-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        {/* Button */}
        <button onClick={handleUpdate} className="update-btn">
          Update Profile
        </button>

      </div>

    </div>
  );
};

export default Profile;