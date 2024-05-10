import { getFirestore, collection, getDocs } from "firebase/firestore";
import { setCurrentUser } from "../pages/auth/utilities/session";

const db = getFirestore();

export async function emailExists(email) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.emailAdd === email) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
}

export async function getUserByEmailAndPassword(email, password) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.emailAdd === email && userData.password === password) {
        const userId = doc.id;
        if (userId) {
          setCurrentUser(userId);
        }
        return userId;
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching user by email and password:", error);
    return null;
  }
}

export async function validateUser(username, password) {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();
      if (userData.emailAdd === username && userData.password === password) {
        return doc.id;
      }
    }
    return false;
  } catch (error) {
    console.error("Error validating user:", error);
    return false;
  }
}

export default db;
