import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const db = getFirestore();

// VALIDATION FUNCTIONS
// Checks if email exists
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
// Checks if phone exists
export async function phoneNumberExists(phoneNumber) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.phone === phoneNumber) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking phone numbe existence:", error);
    return false;
  }
}
// Checks if email and password already exists
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

// CREATE OR INSERT FUNCTION
// Create user with personal info to firebase
export async function createUserWithPersonalInfo(userData, personalInfo) {
  try {
    const userRef = await addDoc(collection(db, "users"), userData);
    await addDoc(
      collection(doc(db, "users", userRef.id), "personalInfo"),
      personalInfo
    );
    console.log("Account created successfully");
    return userRef.id;
  } catch (error) {
    console.error("Error creating user with personal info: ", error);
    throw error;
  }
}

// FETCH FUNCTION
// Fetch id
export async function fetchLatestUserId() {
  try {
    const usersSnapshot = await getDocs(collection(db, "users"));
    if (usersSnapshot.empty) {
      throw new Error("No users found in the database.");
    }
    let latestUser = null;
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (
        !latestUser ||
        (userData.createdAt &&
          userData.createdAt.toMillis() > latestUser.createdAt.toMillis())
      ) {
        latestUser = { id: doc.id, ...userData };
      }
    });
    if (!latestUser) {
      throw new Error("No users found with a valid createdAt timestamp.");
    }
    if (!latestUser.userId) {
      throw new Error("The latest user does not have a userId field.");
    }
    return latestUser.userId;
  } catch (error) {
    console.error("Error fetching the latest user ID: ", error);
    throw error;
  }
}
// Fetch userId by email and password
export async function getUserIdByEmailAndPassword(email, password) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.email === email && userData.password === password) {
        const userId = userData.userId;
        return userId;
      }
    }
    return null;
  } catch (error) {
    console.error("ERROR Fetching UserID:", error);
    return null;
  }
}
//Fetch user info via userId
export async function getUserDataById(userId) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.userId === userId) {
        return userData;
      }
    }
    console.log("wew");
    return null;
  } catch (error) {
    console.error("Error fetching user data by ID:", error);
    return null;
  }
}
