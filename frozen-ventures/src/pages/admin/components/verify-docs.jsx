import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  getRetailers,
  getDistributors,
  getManufacturers,
  updateUserIsVerifiedStatus
} from "../../../firebase/firebase-admin";

export const VerifyDocs = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setUserList(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let users;
        switch (selectedRole) {
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
  }, [selectedRole]);

  const pendingUsers = userList.filter((user) => user.isVerified === "pending");

  const handleVerify = async (userId) => {
    try {
      await updateUserIsVerifiedStatus(userId, "verified");
      const updatedUserList = userList.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isVerified: "verified",
          };
        }
        return user;
      });
      setUserList(updatedUserList);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  return (
    <div className="verify-docs">
      <h1>Pending Users</h1>

      <div className="button-container">
        <button
          className={selectedRole === "All" ? "active" : ""}
          onClick={() => setSelectedRole("All")}
        >
          All
        </button>
        <button
          className={selectedRole === "Retailer" ? "active" : ""}
          onClick={() => setSelectedRole("Retailer")}
        >
          Retailers
        </button>
        <button
          className={selectedRole === "Distributor" ? "active" : ""}
          onClick={() => setSelectedRole("Distributor")}
        >
          Distributors
        </button>
        <button
          className={selectedRole === "Manufacturer" ? "active" : ""}
          onClick={() => setSelectedRole("Manufacturer")}
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
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>isVerified</th>
            <th>Document</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {pendingUsers.map((user) => (
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
                <p>{user.email}</p>
              </td>
              <td>
                <p>{user.phone}</p>
              </td>
              <td>
                <p>{user.role}</p>
              </td>
              <td>
                <p>{user.isVerified}</p>
              </td>
              <td>
                <p>document here</p>
              </td>
              <td>
                <button onClick={() => handleVerify(user.id)}>Verify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
