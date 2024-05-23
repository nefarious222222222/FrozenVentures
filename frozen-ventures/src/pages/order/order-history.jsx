import React, { useEffect, useState } from 'react';
import {fetchOrderHistory} from '../../firebase/firebase-order'


export const OrderHistory = ({ userId }) => {
  const [orderIds, setOrderIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrderHistory = async () => {
      try {
        setLoading(true);
        const orderIds = await fetchOrderHistory(userId);
        setOrderIds(orderIds);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getOrderHistory();
    
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
    console.log(fetchOrderHistory);
  }

  return (
    <div>
      <h2>Order History</h2>
      {orderIds.length > 0 ? (
        <ul>
          {orderIds.map((orderId) => (
            <li key={orderId}>{orderId}</li>
          ))}
        </ul>
      ) : (
        <p>No orders found for this user.</p>
      )}
    </div>
  );
};