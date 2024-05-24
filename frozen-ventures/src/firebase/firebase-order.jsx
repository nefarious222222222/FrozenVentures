import { ref, get, set } from "firebase/database";
import { realtimeDb } from "./firebase-config";

export const createOrder = async (userId, orderId, productId, orderData) => {
  try {
    console.log("Order data:", orderData);
    const ordersRef = ref(realtimeDb, `customers/${userId}/orders/${orderId}/${productId}`);
    await set(ordersRef, orderData);

    console.log("Order creation successful!");
  } catch (error) {
    console.error("Error creating order:", error);
    if (orderData.products) {
      try {
        const ordersRef = ref(
          realtimeDb,
          `customers/${userId}/orders/${orderId}`
        );
        await set(ordersRef, null);
        console.log("Order rollback successful.");
      } catch (rollbackError) {
        console.error("Error during order rollback:", rollbackError);
      }
    }
    throw error;
  }
};

export const generateNewOrderId = async (userId) => {
  const ordersRef = ref(realtimeDb, `customers/${userId}/orders`);
  const snapshot = await get(ordersRef);
  const orders = snapshot.val();
  const orderIds = Object.keys(orders || {});
  if (orderIds.length === 0) return "oid-0001";
  const lastOrderId = orderIds[orderIds.length - 1];
  const lastNumber = parseInt(lastOrderId.split("-")[1], 10);
  const newNumber = lastNumber + 1;
  return `oid-${String(newNumber).padStart(4, "0")}`;
};

export const fetchOrderHistory = async (userId) => {
  try {
    const ordersRef = ref(realtimeDb, `customers/${userId}/orders`);
    const snapshot = await get(ordersRef);
    const orders = snapshot.val();
    if (!orders) {
      console.log("No orders found for this user.");
      return [];
    }

    const orderIds = Object.keys(orders);
    console.log("Order IDs fetched successfully:", orderIds);

    const orderDetailsPromises = orderIds.map(async (orderId) => {
      const orderDetailsRef = ref(
        realtimeDb,
        `customers/${userId}/orders/${orderId}`
      );
      const orderDetailsSnapshot = await get(orderDetailsRef);
      return orderDetailsSnapshot.val();
    });

    const orderDetails = await Promise.all(orderDetailsPromises);
    console.log("Order details fetched successfully:", orderDetails);

    return orderDetails;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};
