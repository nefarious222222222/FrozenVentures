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



// ADMIN FIRESTORE
//Fetch all users
export async function fetchAllUsers() {
  try {
    const usersColRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersColRef);
    const userList = await Promise.all(usersSnapshot.docs.map(async userDoc => {
      const userData = userDoc.data();
      const personalInfoColRef = collection(userDoc.ref, 'personalInfo');
      const personalInfoSnapshot = await getDocs(personalInfoColRef);
      const personalInfoList = personalInfoSnapshot.docs.map(personalInfoDoc => personalInfoDoc.data());
      return { userId: userDoc.id, ...userData, personalInfo: personalInfoList };
    }));

    return userList;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
}