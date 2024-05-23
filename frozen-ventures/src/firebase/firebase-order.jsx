import { ref, get, set, update } from "firebase/database";
import { realtimeDb } from "./firebase-config";

export const createOrder = async (userId, orderId, orderData) => {
  try {
    console.log("Order data:", orderData);
    const ordersRef = ref(realtimeDb, `customers/${userId}/orders/${orderId}`);
    await set(ordersRef, orderData);

    for (const productId in orderData.products) {
      const product = orderData.products[productId];

      const productRef = ref(
        realtimeDb,
        `retailers/2024-0003/products/${productId}`
      );

      const productSnapshot = await get(productRef);
      const currentProduct = productSnapshot.val();
      if (currentProduct && currentProduct.productStock >= product.quantity) {
        const newStock = currentProduct.productStock - product.quantity;
        await update(productRef, { productStock: newStock });
        console.log(`Product ${productId} stock updated successfully.`);
      } else {
        throw new Error(
          `Insufficient stock or product not found: ${product.productName}`
        );
      }
    }

    console.log("Order and stock update successful!");
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

    // Fetch details of each order
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
