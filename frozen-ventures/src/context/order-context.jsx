import React, { createContext, useState } from "react";

export const OrderContext = createContext(null);

export const OrderContextProvider = (props) => {
  const [orderedItems, setOrderedItems] = useState([]);

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