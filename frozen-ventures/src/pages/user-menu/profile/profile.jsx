import React, { useState, useEffect, useContext } from "react";
import "../../../assets/styles/profile.css";
import { UserContext } from "../../../context/user-context";
import UserImg from "../../../assets/images/1.jpg";
import { NotePencil, X } from "phosphor-react";
import { easeInOut, motion as m, AnimatePresence } from "framer-motion";
import {
  getUserDataById,
  getUserPersonalInfoById,
} from "../../../firebase/firebase-operations";

export const Profile = () => {
  const { userId } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const [editable, setEditable] = useState(false);

  const [formUserData, setFormUserData] = useState({
    email: "",
    phoneNum: "",
  });

  const [formUserPersonal, setFormUserPersonal] = useState({
    email: "",
    phoneNum: "",
    fName: "",
    lName: "",
    birthdate: "",
    gender: "",
    street: "",
    barangay: "",
    municipality: "",
    province: "",
    zip: "",
  });

  const handleConfirmEditShow = () => {
    setShowConfirmEdit(true);
  };

  const handleConfirmEditClose = () => {
    setShowConfirmEdit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getUserDataById(userId);
        const userPersonal = await getUserPersonalInfoById(userId);
        if (userData && userPersonal) {
          const userEmail = userData.email;
          const userRole = userData.role;
          setFormUserData({
            email: userData.email,
            phoneNum: userData.phone,
          });
          setFormUserPersonal({
            fName: userPersonal.firstName,
            lName: userPersonal.lastName,
            birthdate: userPersonal.birthdate,
            gender: userPersonal.gender,
          });
          setUserEmail(userEmail);
          setUserRole(userRole);
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
    setShowConfirmEdit(false);
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
          <p>{userEmail}</p>
          <p>{userRole}</p>
          <button
            type="button"
            onClick={editable ? handleConfirmEditShow : handleEditClick}
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
                  name="fName"
                  id="fName"
                  type="text"
                  readOnly={!editable}
                  value={formUserPersonal.fName}
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
                  value={formUserPersonal.lName}
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
                  value={formUserPersonal.birthdate}
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
                  value={formUserPersonal.gender}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field-container">
              <div className="field">
                <label htmlFor="phoneNum">Phone Number:</label>
                <input
                  name="phoneNum"
                  id="phoneNum"
                  type="number"
                  readOnly={!editable}
                  value={formUserData.phoneNum}
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
                  value={formUserPersonal.street}
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
                  value={formUserPersonal.barangay}
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
                  value={formUserPersonal.municipality}
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
                  value={formUserPersonal.province}
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
                  value={formUserPersonal.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {showConfirmEdit && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="confirm-edit"
          >
            <X
              className="x-button"
              size={32}
              onClick={handleConfirmEditClose}
            />
            <div className="header">
              <h2>Save Edit</h2>
              <p>Are you certain you wish to save your changes?</p>
            </div>

            <div className="buttons">
              <button onClick={handleSubmit}>Yes</button>
              <button onClick={handleConfirmEditClose}>Cancel</button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};
