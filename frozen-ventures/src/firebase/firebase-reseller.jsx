import { ref, get, set } from "firebase/database";
import { realtimeDb } from "./firebase-config";

// Fetch orders for retailer and distributor
export async function fetchMatchingOrdersForSeller(role, sellerId) {
  try {
    const lowerCaseRole = role.toLowerCase();
    const sellerProductsRef = ref(
      realtimeDb,
      `${lowerCaseRole}s/${sellerId}/products`
    );
    const sellerProductsSnapshot = await get(sellerProductsRef);

    if (!sellerProductsSnapshot.exists()) {
      console.log("No products found for the given seller.");
      return [];
    }

    const sellerProducts = sellerProductsSnapshot.val();
    const sellerProductIds = Object.keys(sellerProducts);

    let targetPath;
    if (lowerCaseRole === "retailer") {
      targetPath = "customers";
    } else if (lowerCaseRole === "distributor") {
      targetPath = "retailers";
    } else if (lowerCaseRole === "manufacturer") {
      targetPath = "distributors";
    } else {
      console.log("Invalid role specified.");
      return [];
    }

    const targetRef = ref(realtimeDb, targetPath);
    const targetSnapshot = await get(targetRef);

    if (!targetSnapshot.exists()) {
      console.log(`No ${targetPath} found.`);
      return [];
    }

    const targets = targetSnapshot.val();
    const matchingOrders = [];

    for (const targetId in targets) {
      const targetOrders = targets[targetId].orders || {};

      for (const orderId in targetOrders) {
        const order = targetOrders[orderId];

        for (const productId in order) {
          if (sellerProductIds.includes(productId)) {
            matchingOrders.push({
              targetId,
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

// Fetch personal info for order
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

// Fetch products of retailer or distributor
export async function fetchSellerProducts(role, sellerId) {
  try {
    const lowerCaseRole = role.toLowerCase();
    const sellerProductsRef = ref(
      realtimeDb,
      `${lowerCaseRole}s/${sellerId}/products`
    );
    const sellerProductsSnapshot = await get(sellerProductsRef);

    if (!sellerProductsSnapshot.exists()) {
      console.log("No products found for the given seller.");
      return [];
    }

    const sellerProducts = sellerProductsSnapshot.val();
    return sellerProducts;
  } catch (error) {
    console.error("Error fetching seller products:", error);
    return [];
  }
}

// Updates the order status
export const updateOrderStatus = async (
  userRole,
  customerId,
  orderId,
  newStatus
) => {
  try {
    let path;
    if (userRole.toLowerCase() === "retailer") {
      path = `customers/${customerId}/orders/${orderId}/status`;
    } else if (userRole.toLowerCase() === "distributor") {
      path = `retailers/${customerId}/orders/${orderId}/status`;
    } else if (userRole.toLowerCase() === "manufacturer") {
      path = `distributors/${customerId}/orders/${orderId}/status`;
    } else {
      throw new Error("Invalid user role");
    }

    const orderRef = ref(realtimeDb, path);
    await set(orderRef, newStatus);
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// Updates the stock of the product
export const updateProductStock = async (userId, productId, quantity) => {
  try {
    const productRef = ref(
      realtimeDb,
      `retailers/${userId}/products/${productId}/productStock`
    );
    const snapshot = await get(productRef);

    if (snapshot.exists()) {
      const currentStock = snapshot.val();

      if (quantity > currentStock) {
        console.error("Error: Quantity exceeds available stock.");
        throw new Error("Requested quantity exceeds available stock.");
      }

      const updatedStock = currentStock - quantity;
      await set(productRef, updatedStock);
      console.log("Product stock updated successfully.");
    } else {
      throw new Error("Product data not found.");
    }
  } catch (error) {
    console.error("Error updating product stock:", error);
    throw error;
  }
};

export const generateNewProductId = async (userRole, userId) => {
  const lowerCaseUserRole = userRole.toLowerCase();
  const productsRef = ref(
    realtimeDb,
    `${lowerCaseUserRole}s/${userId}/products`
  );
  const snapshot = await get(productsRef);
  const products = snapshot.val();

  let prefix;
  switch (lowerCaseUserRole) {
    case "retailer":
      prefix = "pid";
      break;
    case "distributor":
      prefix = "dpid";
      break;
    case "manufacturer":
      prefix = "mpid";
      break;
    default:
      throw new Error("Invalid user role");
  }

  if (!products) {
    return `${prefix}-0001`;
  }

  const productIds = Object.keys(products);

  const filteredProductIds = productIds.filter((id) => id.startsWith(prefix));

  if (filteredProductIds.length === 0) {
    return `${prefix}-0001`;
  }

  filteredProductIds.sort((a, b) => {
    const numA = parseInt(a.split("-")[1], 10);
    const numB = parseInt(b.split("-")[1], 10);
    return numA - numB;
  });

  const lastProductId = filteredProductIds[filteredProductIds.length - 1];
  const lastNumber = parseInt(lastProductId.split("-")[1], 10);
  const newNumber = lastNumber + 1;

  return `${prefix}-${String(newNumber).padStart(4, "0")}`;
};

export const addProduct = async (userRole, userId, productData) => {
  try {
    const newProductId = await generateNewProductId(userRole, userId);
    const lowerCaseUserRole = userRole.toLowerCase();
    const productRef = ref(
      realtimeDb,
      `${lowerCaseUserRole}s/${userId}/products/${newProductId}`
    );
    await set(productRef, productData);
    console.log("Product added successfully with ID:");
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const editProduct = async (
  userRole,
  userId,
  productId,
  updatedProductData
) => {
  try {
    const lowerCaseUserRole = userRole.toLowerCase();
    const productRef = ref(
      realtimeDb,
      `${lowerCaseUserRole}s/${userId}/products/${productId}`
    );

    const snapshot = await get(productRef);
    if (!snapshot.exists()) {
      throw new Error("Product not found.");
    }

    await set(productRef, updatedProductData);
    console.log("Product updated successfully.");
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Update product stock by productId
export const updateProductStockByProductId = async (
  userRole,
  userId,
  productId,
  newStock
) => {
  try {
    const lowerCaseUserRole = userRole.toLowerCase();
    const productRef = ref(
      realtimeDb,
      `${lowerCaseUserRole}s/${userId}/products/${productId}`
    );
    const snapshot = await get(productRef);

    if (snapshot.exists()) {
      const currentProductData = snapshot.val();
      currentProductData.productStock = newStock;
      await set(productRef, currentProductData);

      console.log("Product stock updated successfully.");
    } else {
      throw new Error("Product data not found.");
    }
  } catch (error) {
    console.error("Error updating product stock:", error);
    throw error;
  }
};

// check wether seller is validated
export async function fetchUserStatus(userId) {
  try {
    const userStatusRef = ref(realtimeDb, `users/${userId}/accountInfo/status`);
    const userStatusSnapshot = await get(userStatusRef);

    if (userStatusSnapshot.exists()) {
      return userStatusSnapshot.val();
    } else {
      console.log("User status not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user status:", error);
    return null;
  }
}

export const updateProductStockAndCheck = async (userRole, userId, productId, quantityToSubtract) => {
  let lowerCaseRole = userRole.toLowerCase();
  const productStockRef = ref(realtimeDb, `${lowerCaseRole}s/${userId}/products/${productId}/productStock`);
console.log(productStockRef)
  try {
    const productSnapshot = await get(productStockRef);
    if (productSnapshot.exists()) {
      const currentStock = productSnapshot.val();
      if (quantityToSubtract > currentStock) {
        console.error("Error: Given stock quantity is higher than current stock.");
      } else {
        const newStock = currentStock - quantityToSubtract;
        await set(productStockRef, newStock);
        console.log(`Product stock updated successfully for productId: ${productId}. New stock: ${newStock}`);
      }
    } else {
      console.error("Error: Product not found for updating stock.");
    }
  } catch (error) {
    console.error("Error updating product stock:", error);
  }
};

export const getProductsBelow20Stock = async (userRole, userId) => {
  try {
    const products = await fetchSellerProducts(userRole, userId);

    const productsBelow20 = Object.entries(products).filter(
      ([_, product]) => product.productStock <= 20
    );

    return productsBelow20.map(([productId, product]) => ({
      productId,
      productName: product.productName,
      productStock: product.productStock,
      productImage: product.productImage,
    }));
  } catch (error) {
    console.error("Error fetching products with stock below 20:", error);
    return [];
  }
};