import { ref, get, set } from "firebase/database";
import { realtimeDb } from "./firebase-config";
import dayjs from "dayjs";

// Get the latest product ID across all users
export const getLatestProductIdAcrossAllUsers = async () => {
  const retailersRef = ref(realtimeDb, `retailers`);
  try {
    const snapshot = await get(retailersRef);
    if (snapshot.exists()) {
      const retailers = snapshot.val();
      let latestProductId = null;
      let latestProductNum = -1;

      for (const userId in retailers) {
        if (retailers.hasOwnProperty(userId)) {
          const products = retailers[userId].products;
          if (products) {
            const productIds = Object.keys(products);
            productIds.forEach((productId) => {
              const productNum = parseInt(productId.split("-")[1], 10);
              if (productNum > latestProductNum) {
                latestProductNum = productNum;
                latestProductId = productId;
              }
            });
          }
        }
      }

      return latestProductId;
    } else {
      console.log("No retailers available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching latest product ID across all users:", error);
    throw error;
  }
};

// Generate a new product ID
export const generateNewProductId = async () => {
  try {
    const latestProductId = await getLatestProductIdAcrossAllUsers();
    let nextProductId;
    if (latestProductId) {
      const latestProductNum = parseInt(latestProductId.split("-")[1], 10);
      const nextProductNum = latestProductNum + 1;
      nextProductId = `pid-${String(nextProductNum).padStart(4, "0")}`;
    } else {
      nextProductId = "pid-0001";
    }
    return nextProductId;
  } catch (error) {
    console.error("Error generating new product ID:", error);
    throw error;
  }
};

// Fetch products data
export async function fetchAllProducts(retailerId) {
  try {
    const productsRef = ref(realtimeDb, `retailers/${retailerId}/products`);
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      const products = snapshot.val();
      const productsArray = Object.keys(products).map((key) => ({
        productId: key,
        ...products[key],
      }));
      return productsArray;
    } else {
      console.log("No products available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Add a product to the database
export const addProduct = async (userId, productData) => {
  const newProductId = await generateNewProductId(userId);
  const newProductRef = ref(
    realtimeDb,
    `retailers/${userId}/products/${newProductId}`
  );

  try {
    console.log("Setting new product data:", {
      productId: newProductId,
      ...productData,
      dateAdded: Date.now(),
    });

    await set(newProductRef, {
      productId: newProductId,
      ...productData,
      dateAdded: Date.now(),
    });

    console.log("Product added successfully");
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Get invtentory info by userId
export const getProductMetrics = async (userId) => {
  try {
    const products = await fetchAllProducts(userId);
    const totalProducts = products.length;
    const totalStocks = products.reduce(
      (sum, product) => sum + (parseInt(product.productStock) || 0),
      0
    );
    const outOfStockCount = products.filter(
      (product) => parseInt(product.productStock) === 0
    ).length;

    return {
      totalProducts,
      totalStocks,
      outOfStockCount,
    };
  } catch (error) {
    console.error("Error fetching product metrics:", error);
    throw error;
  }
};

// Fetch products with stocks lower than 20
export const fetchLowStockProducts = async (retailerId, threshold = 20) => {
  try {
    const products = await fetchAllProducts(retailerId);
    const lowStockProducts = products.filter(
      (product) => parseInt(product.productStock) < threshold
    );
    return lowStockProducts;
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    throw error;
  }
};

// Get products added within the last 7 days
export const fetchNewProductsThisWeek = async (retailerId) => {
  try {
    const productsRef = ref(realtimeDb, `retailers/${retailerId}/products`);
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      const products = snapshot.val();
      const sevenDaysAgo = dayjs().subtract(7, "day").startOf("day").valueOf();

      const newProductsArray = Object.keys(products)
        .map((key) => ({
          productId: key,
          ...products[key],
        }))
        .filter((product) => product.dateAdded >= sevenDaysAgo);

      return newProductsArray;
    } else {
      console.log("No new products available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching new products this week:", error);
    throw error;
  }
};
