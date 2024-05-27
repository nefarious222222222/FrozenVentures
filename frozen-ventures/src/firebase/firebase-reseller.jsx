import { ref, get, set } from "firebase/database";
import { realtimeDb } from "./firebase-config";

export async function fetchMatchingOrdersForSeller(role, retailerId) {
  try {
    const lowerCaseRole = role.toLowerCase();
    const sellerProductsRef = ref(realtimeDb, `${lowerCaseRole}s/${retailerId}/products`);
    const sellerProductsSnapshot = await get(sellerProductsRef);

    if (!sellerProductsSnapshot.exists()) {
      console.log("No products found for the given seller.");
      return [];
    }

    const sellerProducts = sellerProductsSnapshot.val();
    const sellerProductIds = Object.keys(sellerProducts);

    const customersRef = ref(realtimeDb, 'customers');
    const customersSnapshot = await get(customersRef);

    if (!customersSnapshot.exists()) {
      console.log("No customers found.");
      return [];
    }

    const customers = customersSnapshot.val();
    const matchingOrders = [];

    for (const customerId in customers) {
      const customerOrders = customers[customerId].orders || {};

      for (const orderId in customerOrders) {
        const order = customerOrders[orderId];

        for (const productId in order) {
          if (sellerProductIds.includes(productId)) {
            matchingOrders.push({
              customerId,
              orderId,
              order,
            });
            break;
          }
        }
      }
    }

    return matchingOrders;
  } catch (error) {
    console.error("Error fetching matching orders:", error);
    return [];
  }
}

export async function fetchUserPersonalInfo(userId) {
  try {
    const userPersonalInfoRef = ref(realtimeDb, `users/${userId}/personalInfo`);
    const userPersonalInfoSnapshot = await get(userPersonalInfoRef);

    if (userPersonalInfoSnapshot.exists()) {
      const personalInfo = userPersonalInfoSnapshot.val();
      return personalInfo;
    } else {
      console.log("User personal info not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user personal info:", error);
    return null;
  }
}