import { ref, push, get, set } from "firebase/database";
import { realtimeDb } from "./firebase-config";

export const createOrder = async (userId, orderId, orderData) => {
  try {
    const ordersRef = ref(realtimeDb, `customers/${userId}/orders/${orderId}`);
    await set(ordersRef, orderData);
  } catch (error) {
    console.error("Error creating order:", error);
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
