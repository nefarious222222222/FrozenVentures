import React, { createContext, useState, useEffect } from "react";

export const OrderContext = createContext(null);

export const OrderContextProvider = (props) => {
  const [orderedItems, setOrderedItems] = useState(() => {
    const savedOrders = localStorage.getItem('orderedItems');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('orderedItems', JSON.stringify(orderedItems));
  }, [orderedItems]);

  const addOrder = (order) => {
    setOrderedItems((prevOrders) => [...prevOrders, order]);
  };

  const contextValue = {
    orderedItems,
    addOrder,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {props.children}
    </OrderContext.Provider>
  );
};