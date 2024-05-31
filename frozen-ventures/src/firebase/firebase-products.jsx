import { ref, get, set, onValue, remove, child } from "firebase/database";
import { realtimeDb } from "./firebase-config";

// Add items to the realtime database to update cart
export const setCartItemQuantity = async (
  userRole,
  userId,
  productId,
  quantity,
  productPrice,
  productName,
  shopName,
  productImage,
  setQuantityDirectly = false
) => {
  if (
    userId == null ||
    productId == null ||
    quantity == null ||
    productPrice == null ||
    productName == null ||
    shopName == null ||
    productImage == null
  ) {
    console.error("Invalid parameters provided to addItemToCart");
    return;
  }

  const lowerCaseUserRole = userRole.toLowerCase();
  const cartItemRef = ref(
    realtimeDb,
    `${lowerCaseUserRole}s/${userId}/cartItems/${productId}`
  );
  try {
    const snapshot = await get(cartItemRef);
    if (snapshot.exists()) {
      if (setQuantityDirectly) {
        await set(cartItemRef, {
          quantity: quantity,
          productPrice,
          productName,
          shopName,
          productImage,
        });
      } else {
        const existingQuantity = snapshot.val().quantity;
        await set(cartItemRef, {
          quantity: existingQuantity + quantity,
          productPrice,
          productName,
          shopName,
          productImage,
        });
      }
    } else {
      await set(cartItemRef, {
        quantity,
        productPrice,
        productName,
        shopName,
        productImage,
      });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

// Add to the old cart items
export const addItemCartQuantity = async (
  userRole,
  userId,
  productId,
  quantity,
  productPrice,
  productName,
  shopName,
  productImage
) => {
  if (
    userId == null ||
    productId == null ||
    quantity == null ||
    productPrice == null ||
    productName == null ||
    shopName == null ||
    productImage == null
  ) {
    console.error("Invalid parameters provided to addItemToCart");
    return;
  }

  const lowerCaseUserRole = userRole.toLowerCase();
  const cartItemRef = ref(
    realtimeDb,
    `${lowerCaseUserRole}s/${userId}/cartItems/${productId}`
  );

  try {
    const snapshot = await get(cartItemRef);
    if (snapshot.exists()) {
      const existingQuantity = snapshot.val().quantity || 0;
      await set(cartItemRef, {
        quantity: existingQuantity + quantity,
        productPrice,
        productName,
        shopName,
        productImage,
      });
    } else {
      await set(cartItemRef, {
        quantity,
        productPrice,
        productName,
        shopName,
        productImage,
      });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

// Fetch the items from the cart in the realtime database
export const fetchCartItemsForUser = (userRole, userId, callback) => {
  const lowerCaseUserRole = userRole.toLowerCase();
  const cartItemsRef = ref(
    realtimeDb,
    `${lowerCaseUserRole}s/${userId}/cartItems`
  );
  onValue(
    cartItemsRef,
    (snapshot) => {
      const cartItems = snapshot.val();
      if (cartItems) {
        callback(cartItems);
      } else {
        callback({});
      }
    },
    {
      onlyOnce: true,
    }
  );
};

// Remove the item from the cart in realtime database
export const removeItemFromCart = async (userRole, userId, productId) => {
  const lowerCaseUserRole = userRole.toLowerCase();
  const cartItemRef = ref(
    realtimeDb,
    `${lowerCaseUserRole}s/${userId}/cartItems/${productId}`
  );
  try {
    await remove(cartItemRef);
    console.log(`Item with productId ${productId} removed successfully`);
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

// Fetch all products from all users
export const fetchProductsBasedOnUserRole = async (userRole) => {
  try {
    let targetRole;
    if (userRole.toLowerCase() === "customer") {
      targetRole = "retailers";
    } else if (userRole.toLowerCase() === "retailer") {
      targetRole = "distributors";
    } else if (userRole.toLowerCase() === "distributor") {
      targetRole = "manufacturers";
    } else {
      console.log("Invalid user role");
      return [];
    }

    const dbRef = ref(realtimeDb);
    const snapshot = await get(child(dbRef, targetRole));

    if (snapshot.exists()) {
      const usersData = snapshot.val();
      const allProducts = [];

      for (const userId in usersData) {
        const products = usersData[userId].products;
        if (products) {
          for (const productId in products) {
            allProducts.push({ productId, ...products[productId] });
          }
        }
      }
      return allProducts;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error(`Error fetching products for ${userRole}:`, error);
    throw error;
  }
};

// Fetch product stock in retailer by product id
export const fetchProductStockByProductId = async (userRole, productId) => {
  let targetRole;
    if (userRole.toLowerCase() === "customer") {
      targetRole = "retailers";
    } else if (userRole.toLowerCase() === "retailer") {
      targetRole = "distributors";
    } else {
      console.log("Invalid user role");
      return [];
    }
  const retailersRef = ref(realtimeDb, targetRole);

  try {
    const retailersSnapshot = await get(retailersRef);
    if (retailersSnapshot.exists()) {
      const retailers = retailersSnapshot.val();

      for (const retailerId in retailers) {
        if (retailers.hasOwnProperty(retailerId)) {
          const productRef = child(
            retailersRef,
            `${retailerId}/products/${productId}/productStock`
          );
          const productSnapshot = await get(productRef);
          if (productSnapshot.exists()) {
            return productSnapshot.val();
          }
        }
      }
      console.log("Product stock not found for productId:", productId);
      return null;
    } else {
      console.log("No retailers found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product stock:", error);
    return null;
  }
};

// Fetch product size in retailer by product id
export const fetchProductSizeByProductId = async (userRole, productId) => {
  let targetRole;
    if (userRole.toLowerCase() === "customer") {
      targetRole = "retailers";
    } else if (userRole.toLowerCase() === "retailer") {
      targetRole = "distributors";
    } else {
      console.log("Invalid user role");
      return [];
    }
  const retailersRef = ref(realtimeDb, targetRole);

  try {
    const retailersSnapshot = await get(retailersRef);
    if (retailersSnapshot.exists()) {
      const retailers = retailersSnapshot.val();

      for (const retailerId in retailers) {
        if (retailers.hasOwnProperty(retailerId)) {
          const productRef = child(
            retailersRef,
            `${retailerId}/products/${productId}/productSize`
          );
          const productSnapshot = await get(productRef);
          if (productSnapshot.exists()) {
            return productSnapshot.val();
          }
        }
      }
      console.log("Product size not found for productId:", productId);
      return null;
    } else {
      console.log("No retailers found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product size:", error);
    return null;
  }
};

// Fetch the product by productId
export const fetchProductByProductId = async (userRole, productId) => {
  let targetRole;
    if (userRole.toLowerCase() === "customer") {
      targetRole = "retailers";
    } else if (userRole.toLowerCase() === "retailer") {
      targetRole = "distributors";
    } else {
      console.log("Invalid user role");
      return [];
    }
  const retailersRef = ref(realtimeDb, targetRole);

  try {
    const retailersSnapshot = await get(retailersRef);
    if (retailersSnapshot.exists()) {
      const retailers = retailersSnapshot.val();

      for (const retailerId in retailers) {
        if (retailers.hasOwnProperty(retailerId)) {
          const productRef = child(
            retailersRef,
            `${retailerId}/products/${productId}`
          );
          const productSnapshot = await get(productRef);
          if (productSnapshot.exists()) {
            return { retailerId, ...productSnapshot.val() };
          }
        }
      }
      console.log("Product not found for productId:", productId);
      return null;
    } else {
      console.log("No retailers found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
