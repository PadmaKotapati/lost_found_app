import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import { generateLostItemId, saveLostItem } from "../../Services/LostItemService";
import "../../DisplayView.css";

const LostItemRegistration = () => {

  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [newId, setNewId] = useState("");
  const [ldate, setLdate] = useState("");
  const [userId, setUserId] = useState("");

  const [lostItem, setLostItem] = useState({
    lostItemName: "",
    color: "",
    brand: "",
    category: "",
    location: ""
  });

  // ✅ Generate ID
  useEffect(() => {
    generateLostItemId().then(res => setNewId(res.data));
    getUserId().then(res => setUserId(res.data.username));
  }, []);

  // ✅ Handle Input
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLostItem(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Validation + Submit
  const handleValidation = () => {

    let tempErrors = {};
    let isValid = true;

    if (!lostItem.lostItemName.trim()) {
      tempErrors.lostItemName = "Item Name is required";
      isValid = false;
    }
    if (!lostItem.color.trim()) {
      tempErrors.color = "Color is required";
      isValid = false;
    }
    if (!lostItem.brand.trim()) {
      tempErrors.brand = "Brand is required";
      isValid = false;
    }
    if (!lostItem.category.trim()) {
      tempErrors.category = "Category is required";
      isValid = false;
    }
    if (!lostItem.location.trim()) {
      tempErrors.location = "Location is required";
      isValid = false;
    }
    if (!ldate) {
      alert("Please select date");
      isValid = false;
    }

    setErrors(tempErrors);

    if (!isValid) return;

    const newLostItem = {
      lostItemId: newId,
      lostItemName: lostItem.lostItemName,
      color: lostItem.color,
      brand: lostItem.brand,
      category: lostItem.category,
      location: lostItem.location,
      username: userId || "student1",
      lostDate: ldate.toString(),   // ✅ FIX
      status: false
    };

    console.log("Sending:", newLostItem);

    saveLostItem(newLostItem)
      .then(() => setFlag(true))
      .catch(err => console.log("ERROR:", err.response));
  };

  return (
    <div className="container">
      <div className="card col-md-6 offset-md-3">
        <div className="login-box">

          <h2 className="text-center"><u>Lost Item Form</u></h2>

          <div className="form-group">
            <label>Item ID</label>
            <input className="form-control" value={newId} readOnly />
          </div>

          <input name="lostItemName" placeholder="Item Name"
            className="form-control" onChange={onChangeHandler} />
          <p style={{color:"red"}}>{errors.lostItemName}</p>

          <input name="category" placeholder="Category"
            className="form-control" onChange={onChangeHandler} />
          <p style={{color:"red"}}>{errors.category}</p>

          <input name="color" placeholder="Color"
            className="form-control" onChange={onChangeHandler} />
          <p style={{color:"red"}}>{errors.color}</p>

          <input name="brand" placeholder="Brand"
            className="form-control" onChange={onChangeHandler} />
          <p style={{color:"red"}}>{errors.brand}</p>

          <input name="location" placeholder="Location"
            className="form-control" onChange={onChangeHandler} />
          <p style={{color:"red"}}>{errors.location}</p>

          <input type="date" className="form-control"
            onChange={(e) => setLdate(e.target.value)} />

          <br />

          <button className="btn btn-primary" onClick={handleValidation}>
            Submit
          </button>

          <button className="btn btn-success"
            onClick={() => navigate("/student-menu")}>
            Return
          </button>

          {flag && <p style={{color:"blue"}}>Submitted Successfully!</p>}

        </div>
      </div>
    </div>
  );
};

export default LostItemRegistration;