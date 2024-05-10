import React, { useState, useEffect } from "react";
import { AnimatePresence, easeInOut, motion as m } from "framer-motion";
import { doCreateUserWithEmailAndPassword } from "../../firebase/firebase-auth";
import { useFormSubmit } from "./utilities/sign-submit";
import { emailExists } from "../../firebase/firebase-operations";
import {
  validateContactNumber,
  validateEmail,
  validatePassword,
  validateImage,
} from "./utilities/sign-validation";

export const SignUp = () => {
  const [inputFName, setInputFName] = useState("");
  const [inputLName, setInputLName] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [inputCPass, setInputCPass] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputBirthdate, setInputBirthdate] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [formSuccess, setFormSuccess] = useState("");
  const [errors, setErrors] = useState([]);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { submitForm } = useFormSubmit();

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

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setErrors([]);
    }, 1500);

    return () => clearTimeout(errorTimeout);
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);

    const formErrors = [];

    if (!inputFName) {
      formErrors.push("First name is required");
    } else if (!inputLName) {
      formErrors.push("Last name is required");
    } else if (!inputPhone) {
      formErrors.push("Phone is required");
    } else if (!inputBirthdate) {
      formErrors.push("Birthdate is required");
    } else if (!inputEmail) {
      formErrors.push("Email is required");
    } else if (!selectedImage) {
      formErrors.push("Image is required");
    } else if (!selectedRole) {
      formErrors.push("Role is required");
    } else if (!selectedGender) {
      formErrors.push("Gender is required");
    } else if (!inputPass) {
      formErrors.push("Password is required");
    } else if (!inputCPass) {
      formErrors.push("Confirm password is required");
    } else if (inputPass !== inputCPass) {
      formErrors.push("Passwords do not match");
    } else if (!validateContactNumber(inputPhone)) {
      formErrors.push("Invalid phone number");
    } else if (!validateEmail(inputEmail)) {
      formErrors.push("Invalid email address");
    } else if (await emailExists(inputEmail)) {
      formErrors.push("Email address already exists");
    } else if (!validateImage(selectedImage)) {
      formErrors.push(
        "Invalid image must only be 10mb and has an extension of jpg, jpeg, png"
      );
    } else if (!validatePassword(inputPass) || !validatePassword(inputCPass)) {
      formErrors.push(
        "Password must include an uppercase letter, symbol, and be at least 6 characters."
      );
    }

    if (formErrors.length > 0) {
      setErrors(formErrors);
      setIsSigningUp(false);
      return;
    }

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

    try {
      setFormSuccess("Account created. Verification email sent");

      setTimeout(async () => {
        await doCreateUserWithEmailAndPassword(inputEmail, inputPass);
        await submitForm(formData);
      }, 2000);
    } catch (error) {
      console.log(error.message);
      setIsSigningUp(false);
    }
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
          <button type="submit" disabled={isSigningUp}>
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </m.div>
  );
};
