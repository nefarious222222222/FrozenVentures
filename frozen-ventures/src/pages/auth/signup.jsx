import React, { useState } from "react";
import { easeInOut, motion as m } from "framer-motion";
import "../../firebase/firebase-config";
import { getFirestore, addDoc, collection } from "firebase/firestore";

export const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [inputFName, setInputFName] = useState("");
  const [inputLName, setInputLName] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [inputCPass, setInputCPass] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputBirthdate, setInputBirthdate] = useState("");

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setSelectedRole(value);
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setSelectedGender(value);
  };

  const db = getFirestore();

  const signUpUser = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "user"), {
      firstName: inputFName,
      lastName: inputLName,
      phoneNum: inputPhone,
      emailAdd: inputEmail,
      birthdate: inputBirthdate,
      password: inputPass,
      role: selectedRole,
      gender: selectedGender,
    });
    alert("Success");
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="sign-up"
    >
      <form method="POST">
        <div className="input-field grid1">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="Role"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Customer">Customer</option>
            <option value="Retailer">Retailer</option>
            <option value="Distributor">Distributor</option>
            <option value="Manufacturer">Manufacturer</option>
          </select>
        </div>

        <div className="input-container grid2">
          <div className="input-field">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={inputFName}
              onChange={(e) => setInputFName(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="phoneNum">Phone Number:</label>
            <input
              type="number"
              id="phoneNum"
              name="phoneNum"
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="birthdate">Birthdate:</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={inputBirthdate}
              onChange={(e) => setInputBirthdate(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputPass}
              onChange={(e) => setInputPass(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-container grid3">
          <div className="input-field">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={inputLName}
              onChange={(e) => setInputLName(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="emailAdd">Email Address:</label>
            <input
              type="text"
              id="emailAdd"
              name="emailAdd"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field gender">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={selectedGender}
              onChange={handleGenderChange}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="RatherNotSay">Rather not say</option>
            </select>
          </div>

          <div className="input-field">
            <label htmlFor="confirmPass">Password:</label>
            <input
              type="password"
              id="confirmPass"
              name="confirmPass"
              value={inputCPass}
              onChange={(e) => setInputCPass(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="button-container grid4">
          <button onClick={(e) => signUpUser(e)}>Sign Up</button>
        </div>
      </form>
    </m.div>
  );
};
