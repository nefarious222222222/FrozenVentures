import React, { useState } from "react";
import { easeInOut, easeOut, motion as m } from "framer-motion";

export const SignUp = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="sign-up"
    >
      <form action="">
        <div className="input-field grid1">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
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
            <input type="text" id="firstName" name="firstName" />
          </div>

          <div className="input-field">
            <label htmlFor="phoneNum">Phone Number:</label>
            <input type="text" id="phoneNum" name="phoneNum" />
          </div>

          <div className="input-field">
            <label htmlFor="birthdate">Birthdate:</label>
            <input type="date" id="birthdate" name="birthdate" />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
        </div>

        <div className="input-container grid3">
          <div className="input-field">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" />
          </div>

          <div className="input-field">
            <label htmlFor="emailAdd">Email Address:</label>
            <input type="text" id="emailAdd" name="emailAdd" />
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
            <label htmlFor="confirmPass">Confirm Password:</label>
            <input type="password" id="confirmPass" name="confirmPass" />
          </div>
        </div>

        <div className="button-container grid4">
          <button>Sign Up</button>
        </div>
      </form>
    </m.div>
  );
};
