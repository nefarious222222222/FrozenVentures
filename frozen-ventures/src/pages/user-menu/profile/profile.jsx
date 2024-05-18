import React, { useState, useEffect, useContext } from "react";
import "../../../assets/styles/profile.css";
import { UserContext } from "../../../context/user-context";
import UserImg from "../../../assets/images/1.jpg";
import { NotePencil, X } from "phosphor-react";
import { easeInOut, motion as m, AnimatePresence } from "framer-motion";
import {
  getUserInfoById,
  getUserPersonalInfoById,
  updateUserPersonalInfo,
} from "../../../firebase/firebase-users";

export const Profile = () => {
  const { user } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const [editable, setEditable] = useState(false);

  const [formUserData, setFormUserData] = useState({
    email: "",
    phone: "",
  });

  const [formUserPersonal, setFormUserPersonal] = useState({
    email: "",
    firstName: "",
    lastName: "",
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
    setEditable(false);
    setShowConfirmEdit(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user?.userId) {
        const userData = await getUserInfoById(user?.userId);
        const userPersonal = await getUserPersonalInfoById(user?.userId);

        if (userData && userPersonal) {
          const userEmail = userData.email;
          const userPhone = userData.phone;
          const userRole = userData.role;

          setFormUserPersonal({
            firstName: userPersonal.firstName,
            lastName: userPersonal.lastName,
            birthdate: userPersonal.birthdate,
            gender: userPersonal.gender,
            street: userPersonal.street,
            barangay: userPersonal.barangay,
            municipality: userPersonal.municipality,
            province: userPersonal.province,
            zip: userPersonal.zip,
          });

          setUserEmail(userEmail);
          setUserPhone(userPhone);
          setUserRole(userRole);
        }
      }
    };

    fetchData();
  }, [user?.userId]);

  const handleEditClick = () => {
    setEditable(!editable);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEditable(false);
    setShowConfirmEdit(false);

    try {
      await updateUserPersonalInfo(user?.userId, formUserPersonal);
    } catch (error) {
      console.error("Error updating user data and personal info:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormUserPersonal({
      ...formUserPersonal,
      [name]: value,
    });
    setFormUserData({
      ...formUserData,
      [name]: value,
    });
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      const formattedDate = currentDate
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-");
      event.target.value = formattedDate;
    }
    handleChange(event);
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

          <div className="account-info">
            <p>{userEmail}</p>
            <p>{userPhone}</p>
            <p>{userRole}</p>
          </div>
          
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
                <label htmlFor="firstName">First Name:</label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  readOnly={!editable}
                  value={formUserPersonal.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  name="lastName"
                  id="lastName"
                  type="text"
                  readOnly={!editable}
                  value={formUserPersonal.lastName}
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
                  onChange={handleDateChange}
                />
              </div>

              <div className="field">
                <label htmlFor="gender">Gender:</label>
                <select
                  name="gender"
                  id="gender"
                  disabled={!editable}
                  value={formUserPersonal.gender}
                  onChange={handleChange}
                  style={{ opacity: editable ? 1 : 1 }}
                >
                  <option className="option" value="Male">
                    Male
                  </option>
                  <option className="option" value="Female">
                    Female
                  </option>
                  <option className="option" value="Rather not say">
                    Rather not say
                  </option>
                </select>
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
