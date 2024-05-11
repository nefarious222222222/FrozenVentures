import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

const db = getFirestore();

// Checks if value exists
export async function emailExists(email) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.email === email) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking email existence:", error);
    return false;
  }
}

// Checks if value exists
export async function phoneNumberExists(phoneNumber) {
  try {
    const querySnapshot = await getDocs(collection(db, "personalInfo"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.phoneNum === phoneNumber) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking phone number existence:", error);
    return false;
  }
}

// Fetch user id from firestore
export async function getUserByEmailAndPassword(email, password) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.email === email && userData.password === password) {
        const userId = doc.id;
        return userId;
      }
    }
    return null;
  } catch (error) {
    console.error("ERROR Fetching UserID:", error);
    return null;
  }
}

// Checks if email and password are in firestore
export async function validateUser(email, password) {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    for (const doc of usersSnapshot.docs) {
      const userData = doc.data();
      if (userData.email === email && userData.password === password) {
        return doc.id;
      }
    }
    return false;
  } catch (error) {
    console.error("ERROR Validating User:", error);
    return false;
  }
}

// Deletes user firestore collection by id
export async function deleteUserDocByEmailAndPassword(email, password) {
  const db = getFirestore();
  try {
    const userQuerySnapshot = await getDocs(collection(db, "users"));
    userQuerySnapshot.forEach(async (userDoc) => {
      const userData = userDoc.data();
      if (userData.email === email && userData.password === password) {
        await deleteDoc(doc(db, "users", userDoc.id));
        console.log("User Deleted:", userDoc.id);

        await deletePersonalInfoSubcollection(db, userDoc.id);
        console.log("User Personal Info Deleted:", userDoc.id);
      }
    });
  } catch (error) {
    console.error("ERROR Deleting User Document:", error);
  }
}

// Deletes user sub firestore collection by id
async function deletePersonalInfoSubcollection(db, userId) {
  try {
    const personalInfoCollectionRef = collection(db, "users", userId, "personalInfo");
    const personalInfoQuerySnapshot = await getDocs(personalInfoCollectionRef);
    personalInfoQuerySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log("PersonalInfo Document Deleted:", doc.id);
    });
  } catch (error) {
    console.error("ERROR Deleting PersonalInfo Subcollection:", error);
  }
}

export default db;
