import React, { useState, useEffect } from "react";
import { fetchAllUsers } from "../../firebase/firebase-operations";
import { Link } from "react-router-dom";

export const Admin = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchAllUsers();
        setUserList(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
    return () => {};
  }, []);

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
            <tr key={user.userId}>
              <td>{user.userId}</td>
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
    </div>
  );
};