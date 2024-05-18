import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

// PRODUCTS FIRESTORE
// Fetch Products
export async function fetchProductsFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map((doc) => doc.data());
    return productsData;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
}