import React, { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  changePassword,
  uploadProfileImage
} from "../../../Services/LoginService";

const Profile = () => {

  const username = localStorage.getItem("username");

  const [user, setUser] = useState({
    personalName: "",
    email: "",
    image: ""
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    getProfile(username)
      .then(res => setUser(res.data))
      .catch(() => alert("Load failed ❌"));
  }, [username]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateProfile(username, user)
      .then(() => alert("Updated ✅"))
      .catch(() => alert("Failed ❌"));
  };

  const handlePasswordUpdate = () => {
    changePassword(username, passwords)
      .then(res => alert(res.data))
      .catch(err => alert(err.response?.data));
  };

  const handleUpload = () => {
    if (!file) {
      alert("Select file ❌");
      return;
    }

    uploadProfileImage(username, file)
      .then(() => {
        alert("Uploaded ✅");
        window.location.reload();
      })
      .catch(() => alert("Upload Failed ❌"));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2>👤 My Profile</h2>

        <img
          src={`http://localhost:9595/uploads/${user.image}`}
          alt="profile"
          style={styles.image}
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload} style={styles.btn}>Upload</button>

        <input
          name="personalName"
          value={user.personalName}
          onChange={handleChange}
          placeholder="Name"
          style={styles.input}
        />

        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
        />

        <button onClick={handleUpdate} style={styles.btn}>
          Update Profile
        </button>

        <hr />

        <h3>Change Password</h3>

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          onChange={handlePasswordChange}
          style={styles.input}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handlePasswordChange}
          style={styles.input}
        />

        <button onClick={handlePasswordUpdate} style={styles.btn}>
          Change Password
        </button>

      </div>
    </div>
  );
};

export default Profile;

// 🎨 PROFESSIONAL UI
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #4facfe, #00f2fe)"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px",
    cursor: "pointer"
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
    objectFit: "cover"
  }
};