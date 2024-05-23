import React, { createContext, useState, useEffect } from "react";

export const OrderContext = createContext(null);

export const OrderContextProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState(() => {
    const storedOrderDetails = localStorage.getItem('orderDetails');
    try {
      return storedOrderDetails ? JSON.parse(storedOrderDetails) : null;
    } catch (error) {
      console.error("Error parsing orderDetails from localStorage:", error);
      return null;
    }
  });

  const setOrder = (details) => {
    setOrderDetails(details);
  };

  useEffect(() => {
    if (orderDetails) {
      localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    } else {
      localStorage.removeItem('orderDetails');
    }
  }, [orderDetails]);

  const clearOrder = () => {
    setOrderDetails(null);
  };

  const contextValue = {
    orderDetails,
    setOrder,
    clearOrder,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};