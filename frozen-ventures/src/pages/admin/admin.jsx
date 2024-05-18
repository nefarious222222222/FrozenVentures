import React, { useState, useEffect } from "react";
import { getAllUsers, getCustomers, getRetailers, getDistributors, getManufacturers } from "../../firebase/firebase-admin"; // Ensure this path is correct

export const Admin = () => {
  const [userList, setUserList] = useState([]);
  const [selectedRole , setSelectedRole] = useState("");

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
    <div className="container admin">
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setSelectedRole("All")}>All</button>
        <button onClick={() => setSelectedRole("Customer")}>Customers</button>
        <button onClick={() => setSelectedRole("Retailer")}>Retailers</button>
        <button onClick={() => setSelectedRole("Distributor")}>Distributors</button>
        <button onClick={() => setSelectedRole("Manufacturer")}>Manufacturers</button>
      </div>
    </div>
  );
};