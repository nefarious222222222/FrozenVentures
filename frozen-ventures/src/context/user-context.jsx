import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(() => {
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    const shopName = localStorage.getItem("shopName");
    return userId ? { userId, userRole, shopName } : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("userId", user.userId);
      localStorage.setItem("userRole", user.userRole);
      localStorage.setItem("shopName", user.shopName);
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("shopName");
    }
  }, [user]);

  const addUser = (newUserId, newUserRole, newShopName) => {
    setUser({ userId: newUserId, userRole: newUserRole, shopName: newShopName });
  };

  const clearUser = () => {
    setUser(null);
  };

  const contextValue = {
    user,
    addUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
