import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
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




// FETCHING FUNCTIONS
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
//Fetch any field by email
export async function getFieldsByEmail(email) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.email === email) {
        return userData;
      }
    }
    return null;
  } catch (error) {
    console.error(`ERROR Fetching ${fieldName} by Email:`, error);
    return null;
  }
}
//Fetch any field by user id
export async function getRoleByUserId(userId) {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.userId === userId) {
        return userData.role;
      }
    }
    return null;
  } catch (error) {
    console.error(`ERROR Fetching ${fieldName} by Email:`, error);
    return null;
  }
}





// CREATE OR INSERT FUNCTION
// Create user with personal info to firebase
export const createUserWithPersonalInfo = async (userData, personalInfo) => {
  try {
    const userRef = await addDoc(collection(db, "users"), userData);
    await addDoc(collection(doc(db, "users", userRef.id), "personalInfo"), personalInfo);
    console.log("Account created successfully");
    return userRef.id;
  } catch (error) {
    console.error("Error creating user with personal info: ", error);
    throw error;
  }
};
// Update any field by username and password
export const updateUserField = async (email, fieldName, fieldValue) => {
  try {
    const userQuerySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", email)));

    if (!userQuerySnapshot.empty) {
      const userDocRef = userQuerySnapshot.docs[0].ref;
      await updateDoc(userDocRef, {
        [fieldName]: fieldValue
      });
      console.log(`Field "${fieldName}" updated successfully for user with email: ${email}`);
    } else {
      console.log(`No user found with email: ${email}`);
    }
  } catch (error) {
    console.error(`Error updating field "${fieldName}" for user with email: ${email}:`, error);
    throw error;
  }
};