import React, { useState } from "react";
import "../../../assets/styles/profile.css";
import UserImg from "../../../assets/images/1.jpg";
import { NotePencil } from "phosphor-react";
import { easeInOut, motion as m } from "framer-motion";

export const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    fname: "Vince Jeremy",
    lName: "Canaria",
    birthdate: "1973-04-04",
    gender: "Male",
    email: "asdfnkl@gmail.com",
    phoneNum: "09123123123",
    street: "#420 Radiant Street",
    barangay: "Dota",
    municipality: "Valve City",
    province: "Steam",
    zip: "9110",
  });

  const handleEditClick = () => {
    setEditable(!editable);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data saved:", formData);
    setEditable(false); // After saving, switch back to non-editable mode
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
          <button type="button" onClick={editable ? handleSubmit : handleEditClick}>
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
                  placeholder="Vince Jeremy"
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
                  placeholder="Canaria"
                  readOnly={!editable}
                  value={formData.lName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-container">
              <div className="field">
                <label htmlFor="birthdate">
                  Birthdate: <span className="birthdate-text">04/04/1973</span>
                </label>
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
                  placeholder="Male"
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
                  placeholder="asdfnkl@gmail.com"
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
                  placeholder="09123123123"
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
                  placeholder="#420 Radiant Street"
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
                  placeholder="Dota"
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
                  placeholder="Valve City"
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
                  placeholder="Steam"
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
                  placeholder="9110"
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