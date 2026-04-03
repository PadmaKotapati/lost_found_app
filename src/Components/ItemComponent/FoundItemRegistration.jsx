import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import {
  generateFoundItemId,
  saveFoundItem,
} from "../../Services/FoundItemService";

const FoundItemRegistration = () => {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [newId, setNewId] = useState("");
  const [fdate, setFdate] = useState("");
  const [userId, setUserId] = useState("");

  const [foundItem, setFoundItem] = useState({
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
  });

  useEffect(() => {
    generateFoundItemId().then((res) => setNewId(res.data));
    getUserId().then((res) => setUserId(res.data.username));
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFoundItem({ ...foundItem, [name]: value });
  };

  const handleValidation = () => {
    let temp = {};
    let valid = true;

    Object.entries(foundItem).forEach(([key, val]) => {
      if (!val.trim()) {
        temp[key] = "Required";
        valid = false;
      }
    });

    if (!fdate) {
      temp.foundDate = "Date required";
      valid = false;
    }

    setErrors(temp);

    if (valid) submitData();
  };

  const submitData = () => {
    const data = {
      foundItemId: newId,
      foundItemName: foundItem.foundItemName,
      color: foundItem.color,
      brand: foundItem.brand,
      category: foundItem.category,
      location: foundItem.location,
      username: userId || localStorage.getItem("username"),
      foundDate: fdate,
      status: false,
    };

    saveFoundItem(data)
      .then(() => {
        setFlag(true);
        alert("✅ Saved Successfully");
      })
      .catch(() => alert("❌ Error Saving"));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Found Item Form</h2>

        <input value={newId} readOnly style={styles.input} />

        {Object.keys(foundItem).map((key) => (
          <div key={key}>
            <input
              name={key}
              placeholder={key}
              value={foundItem[key]}
              onChange={onChangeHandler}
              style={styles.input}
            />
            <p style={styles.error}>{errors[key]}</p>
          </div>
        ))}

        <input
          type="date"
          value={fdate}
          onChange={(e) => setFdate(e.target.value)}
          style={styles.input}
        />
        <p style={styles.error}>{errors.foundDate}</p>

        <button style={styles.primaryBtn} onClick={handleValidation}>
          Submit
        </button>

        <button style={styles.successBtn} onClick={() => navigate("/student-menu")}>
          Back
        </button>

        {flag && <p style={styles.success}>Saved Successfully</p>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(to right,#4facfe,#00f2fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px",
  },
  successBtn: {
    width: "100%",
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    marginTop: "10px",
  },
  error: { color: "red", fontSize: "12px" },
  success: { color: "green", textAlign: "center", marginTop: "10px" },
};

export default FoundItemRegistration;