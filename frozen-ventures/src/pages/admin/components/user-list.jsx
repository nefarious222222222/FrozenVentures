import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  getCustomers,
  getRetailers,
  getDistributors,
  getManufacturers,
} from "../../../firebase/firebase-admin";

export const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");

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
  }, [selectedRole]);

  return (
    <div className="user-list">
      <h1>User List</h1>

      <div className="button-container">
        <button
          className={selectedRole === "All" ? "active" : ""}
          onClick={() => setSelectedRole("All")}
        >
          All
        </button>
        <button
          className={selectedRole === "Customer" ? "active" : ""}
          onClick={() => setSelectedRole("Customer")}
        >
          Customers
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
    </div>
  );
};
