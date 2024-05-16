import React, { useState, useEffect, useContext } from "react";
import "../../../assets/styles/profile.css";
import { UserContext } from "../../../context/user-context";
import UserImg from "../../../assets/images/1.jpg";
import { NotePencil } from "phosphor-react";
import { easeInOut, motion as m } from "framer-motion";
import { getUserDataById } from "../../../firebase/firebase-operations";

export const Profile = () => {
  const { userId } = useContext(UserContext);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phoneNum: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getUserDataById(userId);
        if (userData) {
          setFormData({
            email: userData.email,
            phoneNum: userData.phone,
          })
        }
      }
    };

    fetchData();
  }, [userId]);

  const handleEditClick = () => {
    setEditable(!editable);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data saved:", formData);
    setEditable(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <m.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container profile"
    >
      <form className="user">
        <div className="user-profile">
          <img src={UserImg} alt="User" />
          <p>Role: </p>
          <button
            type="button"
            onClick={editable ? handleSubmit : handleEditClick}
          >
            <NotePencil size={30} /> <p>{editable ? "Save" : "Edit"}</p>
          </button>
        </div>

        <div className="user-info">
          <h2>User Information</h2>

          <div className="info">
            <div className="field-container">
              <div className="field">
                <label htmlFor="fName">First Name:</label>
                <input
                  name="fname"
                  id="fName"
                  type="text"
                  readOnly={!editable}
                  value={formData.fname}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="lName">Last Name:</label>
                <input
                  name="lName"
                  id="lName"
                  type="text"
                  readOnly={!editable}
                  value={formData.lName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-container">
              <div className="field">
                <label htmlFor="birthdate">Birthdate:</label>
                <input
                  name="birthdate"
                  id="birthdate"
                  type="date"
                  readOnly={!editable}
                  value={formData.birthdate}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="gender">Gender:</label>
                <input
                  name="gender"
                  id="gender"
                  type="text"
                  readOnly={!editable}
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-container">
              <div className="field">
                <label htmlFor="email">Email:</label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  readOnly={!editable}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="phoneNum">Phone Number:</label>
                <input
                  name="phoneNum"
                  id="phoneNum"
                  type="number"
                  readOnly={!editable}
                  value={formData.phoneNum}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <h2>Address</h2>

          <div className="info">
            <div className="field-container">
              <div className="field">
                <label htmlFor="street">Street:</label>
                <input
                  name="street"
                  id="street"
                  type="text"
                  readOnly={!editable}
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="barangay">Barangay:</label>
                <input
                  name="barangay"
                  id="barangay"
                  type="text"
                  readOnly={!editable}
                  value={formData.barangay}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-container">
              <div className="field">
                <label htmlFor="municipality">Municipality:</label>
                <input
                  name="municipality"
                  id="municipality"
                  type="text"
                  readOnly={!editable}
                  value={formData.municipality}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="province">Province:</label>
                <input
                  name="province"
                  id="province"
                  type="text"
                  readOnly={!editable}
                  value={formData.province}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-container">
              <div className="field">
                <label htmlFor="zip">Zip:</label>
                <input
                  name="zip"
                  id="zip"
                  type="text"
                  readOnly={!editable}
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </m.div>
  );
};
