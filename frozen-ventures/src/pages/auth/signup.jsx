import React, { useState, useEffect } from "react";
import { AnimatePresence, easeInOut, motion as m } from "framer-motion";
import { useFormSubmit } from "./signup-form";

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
  const [selectedImage, setSelectedImage] = useState("");

  const { errors, setErrors, formSuccess, submitForm } = useFormSubmit();

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setErrors([]);
    }, 3000);

    return () => clearTimeout(errorTimeout);
  }, [errors]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      inputFName,
      inputLName,
      inputPass,
      inputCPass,
      inputPhone,
      inputEmail,
      inputBirthdate,
      selectedRole,
      selectedGender,
      selectedImage,
    };
    submitForm(formData);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="sign-up"
    >
      <form method="POST" onSubmit={handleSubmit}>
        <AnimatePresence>
          {errors.length > 0 && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className="error-container"
            >
              {errors.map((error, index) => (
                <m.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5, ease: easeInOut }}
                  key={index}
                  className="alert-error"
                >
                  <p>{error}</p>
                </m.div>
              ))}
            </m.div>
          )}
        </AnimatePresence>

        {formSuccess && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className="success-container"
          >
            <m.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className="alert-success"
            >
              <p>{formSuccess}</p>
            </m.div>
          </m.div>
        )}

        <div className="input-container grid1">
          <div className="input-field">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={inputFName}
              onChange={(e) => setInputFName(e.target.value)}
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
            />
          </div>

          <div className="input-field">
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

          <div className="input-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputPass}
              onChange={(e) => setInputPass(e.target.value)}
            />
          </div>
        </div>

        <div className="input-container grid2">
          <div className="input-field">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={inputLName}
              onChange={(e) => setInputLName(e.target.value)}
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
            />
          </div>

          <div className="input-field image-upload">
            <label htmlFor="imageUpload">Choose Image:</label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
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
            />
          </div>
        </div>

        <div className="button-container grid3">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </m.div>
  );
};
