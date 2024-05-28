import { ref, get, set, update } from "firebase/database";
import { realtimeDb } from "./firebase-config";

// Cancel request for customer
export const updateOrderStatusToCancel = async (customerId, orderId, cancelReason) => {
  try {
    const orderRef = ref(
      realtimeDb,
      `customers/${customerId}/orders/${orderId}`
    );

    const snapshot = await get(orderRef);

    if (snapshot.exists()) {
      const orderData = snapshot.val();

      const updatedOrderData = {
        ...orderData,
        status: "cancel requested",
        cancelReason: cancelReason,
      };
      await update(orderRef, updatedOrderData);

      console.log(`Order ${orderId} updated successfully.`);
    } else {
      console.log(`Order ${orderId} not found.`);
    }
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};
