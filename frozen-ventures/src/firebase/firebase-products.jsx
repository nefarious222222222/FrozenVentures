import { ref, get, set, onValue, remove } from "firebase/database";
import { realtimeDb } from "./firebase-config";

// Add items to the realtime database to update cart
export const addItemToCart = async (
  userId,
  productId,
  quantity,
  productPrice,
  productName,
  productRetailer,
  productImage
) => {
  const cartItemRef = ref(
    realtimeDb,
    `customers/${userId}/cartItems/${productId}`
  );
  try {
    const snapshot = await get(cartItemRef);
    if (snapshot.exists()) {
      const existingQuantity = snapshot.val().quantity;
      await set(cartItemRef, {
        quantity: existingQuantity + quantity,
        productPrice,
        productName,
        productRetailer,
        productImage,
      });
    } else {
      await set(cartItemRef, {
        quantity,
        productPrice,
        productName,
        productRetailer,
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
  if (productIds.length === 0) return 'pid-0001';

  const lastProductId = productIds[productIds.length - 1];
  const lastNumber = parseInt(lastProductId.split('-')[1], 10);
  const newNumber = lastNumber + 1;
  return `pid-${String(newNumber).padStart(4, '0')}`;
};

export const addProduct = async (userId, productName, productPrice, productStock, productDescription, productImage) => {
  const newProductId = await generateNewProductId(userId);
  const newProductRef = ref(realtimeDb, `retailers/${userId}/products/${newProductId}`);
  try {
    await set(newProductRef, {
      productId: newProductId,
      productName,
      productPrice,
      productStock,
      productDescription,
      productImage
    });
  } catch (error) {
    console.error("Error adding product:", error);
  }
};



