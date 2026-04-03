import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateLostItemId, saveLostItem } from "../../Services/LostItemService";

const LostItemRegistration = () => {

  const navigate = useNavigate();

  const [newId, setNewId] = useState("");
  const [ldate, setLdate] = useState("");

  const [lostItem, setLostItem] = useState({
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: ""
  });

  useEffect(() => {
    generateLostItemId().then(res => setNewId(res.data));
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLostItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {

    if (!ldate) {
      alert("Select Date");
      return;
    }

    const newLostItem = {
      lostItemId: newId,
      ...lostItem,
      lostDate: ldate,
      status: false
    };

    saveLostItem(newLostItem)
      .then(() => {
        alert("✅ Item Submitted Successfully");
        navigate("/lost-item-report");
      })
      .catch(() => alert("❌ Error"));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Report Lost Item</h2>

        <input value={newId} readOnly style={styles.input} />

        <input name="lostItemName" placeholder="Item Name" style={styles.input} onChange={onChangeHandler}/>
        <input name="category" placeholder="Category" style={styles.input} onChange={onChangeHandler}/>
        <input name="color" placeholder="Color" style={styles.input} onChange={onChangeHandler}/>
        <input name="brand" placeholder="Brand" style={styles.input} onChange={onChangeHandler}/>
        <input name="location" placeholder="Location" style={styles.input} onChange={onChangeHandler}/>

        <input type="date" style={styles.input} onChange={(e)=>setLdate(e.target.value)} />

        <button style={styles.btn} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg,#1e3c72,#2a5298)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
  },
  title: {
    textAlign: "center",
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  btn: {
    width: "100%",
    padding: "10px",
    background: "#2a5298",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default LostItemRegistration;