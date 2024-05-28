import { ref, get, set } from "firebase/database";
import { realtimeDb } from "./firebase-config";

export const createOrder = async (userId, orderId, orderData) => {
  try {
    console.log("Order data:", orderData);
    const ordersRef = ref(realtimeDb, `customers/${userId}/orders/${orderId}`);
    await set(ordersRef, orderData);

    console.log("Order creation successful!");
  } catch (error) {
    console.error("Error creating order:", error);
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

export const fetchPurchaseHistory = async (userId) => {
  try {
    const ordersRef = ref(realtimeDb, `customers/${userId}/orders`);
    const snapshot = await get(ordersRef);
    const orders = snapshot.val();

    if (!orders) {
      console.log("No orders found for this user.");
      return [];
    }

    const orderDetails = [];

    for (const orderId in orders) {
      const orderInfo = orders[orderId];
      const { orderDate, shippingMode, status, subTotal, quantity, shippingDate, cancelReason, ...productsData } =
        orderInfo;

      const products = [];

      for (const productId in productsData) {
        if (
          productId !== "orderDate" &&
          productId !== "shippingMode" &&
          productId !== "status" &&
          productId !== "subTotal"
        ) {
          const productDetails = productsData[productId];
          products.push({
            productId,
            productName: productDetails.productName,
            productImage: productDetails.productImage,
            productPrice: productDetails.productPrice,
            shopName: productDetails.shopName,
          });
        }
      }

      orderDetails.push({
        orderId,
        orderDate,
        shippingMode,
        status,
        subTotal,
        products,
        quantity,
        subTotal,
        shippingDate,
        cancelReason,
      });
    }

    console.log("Order details fetched successfully:", orderDetails);
    return orderDetails;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};
