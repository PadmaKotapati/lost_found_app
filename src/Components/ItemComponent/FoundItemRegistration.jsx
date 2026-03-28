import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Services/LoginService";
import { generateFoundItemId, saveFoundItem } from "../../Services/FoundItemService";
import "../../DisplayView.css";

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
    location: ""
  });

  // 🔹 Get Found Item ID
  useEffect(() => {
    generateFoundItemId().then(res => {
      setNewId(res.data);
    });

    getUserId().then(res => {
      setUserId(res.data.username);
    });

  }, []);

  // 🔹 Handle input change
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFoundItem({ ...foundItem, [name]: value });
  };

  // 🔹 Validation
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      isValid = false;
    }
    if (!foundItem.color.trim()) {
      tempErrors.color = "Color is required";
      isValid = false;
    }
    if (!foundItem.brand.trim()) {
      tempErrors.brand = "Brand is required";
      isValid = false;
    }
    if (!foundItem.category.trim()) {
      tempErrors.category = "Category is required";
      isValid = false;
    }
    if (!foundItem.location.trim()) {
      tempErrors.location = "Location is required";
      isValid = false;
    }
    if (!fdate) {
      tempErrors.foundDate = "Date is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      foundItemSubmit();
    }
  };

  // 🔹 Submit function
  const foundItemSubmit = () => {

    const newFoundItem = {
      foundItemId: newId,
      foundItemName: foundItem.foundItemName,
      color: foundItem.color,
      brand: foundItem.brand,
      category: foundItem.category,
      location: foundItem.location,
      username: userId,
      foundDate: fdate.toString(),
      status: false
    };

   console.log("Sending DTO:", JSON.stringify(newFoundItem, null, 2));

    saveFoundItem(newFoundItem)
      .then(res => {
        console.log("SUCCESS:", res.data);
        setFlag(true);

        // Reset form
        setFoundItem({
          foundItemName: "",
          color: "",
          brand: "",
          category: "",
          location: ""
        });
        setFdate("");
      })
      .catch(err => {
        console.error("ERROR:", err.response?.data || err.message);
        alert("Error while saving. Check console.");
      });
  };

  // 🔹 Navigate back
  const returnBack = () => {
    navigate("/student-menu");
  };

  // 🔹 New form
  const nextItem = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <div className="login-box">

            <h2 className="text-center">
              <u>Found Item Form Submission</u>
            </h2>

            <div className="form-group">
              <label>Item Id:</label>
              <input className="form-control" value={newId} readOnly />
            </div>

            <div className="form-group">
              <label>Item Name:</label>
              <input
                name="foundItemName"
                className="form-control"
                value={foundItem.foundItemName}
                onChange={onChangeHandler}
              />
              <p style={{ color: "red" }}>{errors.foundItemName}</p>
            </div>

            <div className="form-group">
              <label>Category:</label>
              <input
                name="category"
                className="form-control"
                value={foundItem.category}
                onChange={onChangeHandler}
              />
              <p style={{ color: "red" }}>{errors.category}</p>
            </div>

            <div className="form-group">
              <label>Color:</label>
              <input
                name="color"
                className="form-control"
                value={foundItem.color}
                onChange={onChangeHandler}
              />
              <p style={{ color: "red" }}>{errors.color}</p>
            </div>

            <div className="form-group">
              <label>Brand:</label>
              <input
                name="brand"
                className="form-control"
                value={foundItem.brand}
                onChange={onChangeHandler}
              />
              <p style={{ color: "red" }}>{errors.brand}</p>
            </div>

            <div className="form-group">
              <label>Location:</label>
              <input
                name="location"
                className="form-control"
                value={foundItem.location}
                onChange={onChangeHandler}
              />
              <p style={{ color: "red" }}>{errors.location}</p>
            </div>

            <div className="form-group">
              <label>Found Date:</label>
              <input
                type="date"
                className="form-control"
                value={fdate}
                onChange={(e) => setFdate(e.target.value)}
              />
              <p style={{ color: "red" }}>{errors.foundDate}</p>
            </div>

            <br />

            <button className="btn btn-primary" onClick={handleValidation}>
              Submit
            </button>

            &nbsp;&nbsp;

            <button className="btn btn-success" onClick={returnBack}>
              Return
            </button>

            <br /><br />

            {flag && (
              <div>
                <p style={{ color: "green" }}>
                  ✅ Submitted Successfully!
                </p>
                <button className="btn btn-warning" onClick={nextItem}>
                  Add Another
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundItemRegistration;