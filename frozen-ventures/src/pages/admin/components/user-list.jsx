import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  getCustomers,
  getRetailers,
  getDistributors,
  getManufacturers,
} from "../../../firebase/firebase-admin";

export const UserList = () => {
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

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

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
  const [userList, setUserList] = useState([]);
  const [selectRole, setSelectRole] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let users;
        switch (selectedRole) {
          case "Customer":
            users = await getCustomers();
            break;
          case "Retailer":
            users = await getRetailers();
            break;
          case "Distributor":
            users = await getDistributors();
            break;
          case "Manufacturer":
            users = await getManufacturers();
            break;
          default:
            users = await getAllUsers();
        }
        setUserList(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [selectRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = [];
    setSuccessMessage("");

    if (!selectedRole) {
      formErrors.push("Role is required");
    } else if (!inputFName) {
      formErrors.push("First name is required");
    } else if (!inputLName) {
      formErrors.push("Last name is required");
    } else if (!inputPhone) {
      formErrors.push("Phone is required");
    } else if (!inputBirthdate) {
      formErrors.push("Birthdate is required");
    } else if (!inputEmail) {
      formErrors.push("Email is required");
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
    } else if (!validatePassword(inputPass) || !validatePassword(inputCPass)) {
      formErrors.push(
        "Password must include an uppercase letter, symbol, and be at least 6 characters."
      );
    } else if (
      selectedRole === "Retailer" ||
      selectedRole === "Distributor" ||
      selectedRole === "Manufacturer"
    ) {
      if (!selectedImage) {
        formErrors.push("Image is required");
      }
    }

    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const latestUserId = await getLatestUserId();
      const userId = IdGenerator(latestUserId);
      await addUserAccountInfo(
        {
          inputPass,
          inputPhone,
          inputEmail,
          selectedRole,
        },
        userId
      );
      await addUserPersonalInfo(
        {
          inputFName,
          inputLName,
          inputPass,
          inputBirthdate,
          selectedGender,
          selectedImage: "MIYAW",
        },
        userId
      );
      setSuccessMessage("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      setErrors(["Error adding user. Please try again."]);
    }
  };

  return (
    <div className="user-list">
      <h1>User List</h1>

      <div className="button-container">
        <button
          className={selectedRole === "All" ? "active" : ""}
          onClick={() => setSelectRole("All")}
        >
          All
        </button>
        <button
          className={selectedRole === "Customer" ? "active" : ""}
          onClick={() => setSelectRole("Customer")}
        >
          Customers
        </button>
        <button
          className={selectedRole === "Retailer" ? "active" : ""}
          onClick={() => setSelectRole("Retailer")}
        >
          Retailers
        </button>
        <button
          className={selectedRole === "Distributor" ? "active" : ""}
          onClick={() => setSelectRole("Distributor")}
        >
          Distributors
        </button>
        <button
          className={selectedRole === "Manufacturer" ? "active" : ""}
          onClick={() => setSelectRole("Manufacturer")}
        >
          Manufacturers
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthdate</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>
                <p>{user.id}</p>
              </td>
              <td>
                <p>{user.firstName}</p>
              </td>
              <td>
                <p>{user.lastName}</p>
              </td>
              <td>
                <p>{user.birthdate}</p>
              </td>
              <td>
                <p>{user.gender}</p>
              </td>
              <td>
                <p>{user.email}</p>
              </td>
              <td>
                <p>{user.phone}</p>
              </td>
              <td>
                <p>{user.role}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="edit-user">
        <h1>Edit User</h1>
        <form className="header">
          <div className="input-field">
            <label htmlFor="userId">Edit User:</label>
            <input name="userId" id="userId" type="text" />
          </div>

          <button>Edit</button>
        </form>

        <form className="edit-form" onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="error-container">
              {errors.map((error, index) => (
                <div key={index} className="alert-error">
                  <p>{error}</p>
                </div>
              ))}
            </div>
          )}
          {successMessage && (
            <div className="success-container">
              <p>{successMessage}</p>
            </div>
          )}
          <div className="input-container">
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
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={inputLName}
                onChange={(e) => setInputLName(e.target.value)}
              />
            </div>
          </div>

          <div className="input-container">
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
              <label htmlFor="birthdate">Birthdate:</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={inputBirthdate}
                onChange={(e) => setInputBirthdate(e.target.value)}
                max={today}
              />
            </div>
          </div>

          <div className="input-container">
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
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={inputPass}
                onChange={(e) => setInputPass(e.target.value)}
              />
            </div>

            <div className="input-field">
              <label htmlFor="confirmPass">Confirm Password:</label>
              <input
                type="password"
                id="confirmPass"
                name="confirmPass"
                value={inputCPass}
                onChange={(e) => setInputCPass(e.target.value)}
              />
            </div>
          </div>

          {(selectedRole === "Retailer" ||
            selectedRole === "Distributor" ||
            selectedRole === "Manufacturer") && (
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
          )}

          <div className="submit-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
