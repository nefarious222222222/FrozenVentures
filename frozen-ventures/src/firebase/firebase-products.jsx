import { ref, get, set, onValue, remove, child } from "firebase/database";
import { realtimeDb } from "./firebase-config";

// Add items to the realtime database to update cart
export const addItemToCart = async (
  userId,
  productId,
  quantity,
  productPrice,
  productName,
  shopName,
  productImage,
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

  const cartItemRef = ref(realtimeDb, `customers/${userId}/cartItems/${productId}`);
  try {
    const snapshot = await get(cartItemRef);
    if (snapshot.exists()) {
      const existingQuantity = snapshot.val().quantity;
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
export const fetchCartItemsForUser = (userId, callback) => {
  const cartItemsRef = ref(realtimeDb, `customers/${userId}/cartItems`);
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
export const removeItemFromCart = async (userId, productId) => {
  const cartItemRef = ref(
    realtimeDb,
    `customers/${userId}/cartItems/${productId}`
  );
  try {
    await remove(cartItemRef);
    console.log(`Item with productId ${productId} removed successfully`);
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

// Function to generate a new product ID
const generateNewProductId = async (userId) => {
  const productsRef = ref(realtimeDb, `retailers/${userId}/products`);
  const snapshot = await get(productsRef);
  const products = snapshot.val();
  const productIds = Object.keys(products || {});
  if (productIds.length === 0) return "pid-0001";

  const lastProductId = productIds[productIds.length - 1];
  const lastNumber = parseInt(lastProductId.split("-")[1], 10);
  const newNumber = lastNumber + 1;
  return `pid-${String(newNumber).padStart(4, "0")}`;
};

// Add product in firebase
export const addProduct = async (
  userId,
  productName,
  productPrice,
  productStock,
  productDescription,
  productImage,
  shopName,
) => {
  const newProductId = await generateNewProductId(userId);
  const newProductRef = ref(
    realtimeDb,
    `retailers/${userId}/products/${newProductId}`
  );
  try {
    await set(newProductRef, {
      productId: newProductId,
      productName,
      productPrice,
      productStock,
      productDescription,
      productImage,
      shopName,
    });
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Fetch all products from all users
export const fetchAllProductsFromAllUsers = async () => {
  try {
    const dbRef = ref(realtimeDb);
    const snapshot = await get(child(dbRef, "retailers"));
    if (snapshot.exists()) {
      const retailersData = snapshot.val();
      const allProducts = [];

      for (const retailerId in retailersData) {
        const products = retailersData[retailerId].products;
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
    console.error("Error fetching all products from all users:", error);
    throw error;
  }
};

// Function to fetch products added within the last 7 days
export const fetchLatestProductsFromAllUsers = async () => {
  const allProducts = await fetchAllProductsFromAllUsers();
  const oneWeekAgo = dayjs().subtract(7, 'day').toDate();
  return allProducts.filter(product => {
    const productDate = new Date(product.dateAdded);
    return productDate >= oneWeekAgo;
  });
};

// Fetch product stock in retailer by product id
export const fetchProductStockByProductId = async (productId) => {
  const retailersRef = ref(realtimeDb, 'retailers');

  try {
    const retailersSnapshot = await get(retailersRef);
    if (retailersSnapshot.exists()) {
      const retailers = retailersSnapshot.val();

      for (const retailerId in retailers) {
        if (retailers.hasOwnProperty(retailerId)) {
          const productRef = child(retailersRef, `${retailerId}/products/${productId}/productStock`);
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