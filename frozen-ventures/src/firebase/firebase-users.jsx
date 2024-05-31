import { ref, get, set, update } from "firebase/database";
import { realtimeDb } from "./firebase-config";
import bcrypt from "bcryptjs";

// FETCH IN REALTIME DATABASE
// Fetch the latest userId that has been created
export async function getLatestUserId() {
  const usersRef = ref(realtimeDb, "users");
  try {
    const snapshot = await get(usersRef);
    let latestUserId = null;
    snapshot.forEach((childSnapshot) => {
      const userId = childSnapshot.key;
      if (!latestUserId || userId > latestUserId) {
        latestUserId = userId;
      }
    });
    if (!latestUserId || !/^\d{4}-\d{4}$/.test(latestUserId)) {
      const currentYear = new Date().getFullYear();
      latestUserId = `${currentYear}-0000`;
    }
    return latestUserId;
  } catch (error) {
    console.error("Error fetching latest userId:", error);
    throw error;
  }
}
// Fetch UserId by email and password
export async function getUserIdByEmailAndPassword(email, password) {
  const usersRef = ref(realtimeDb, "users");
  try {
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    for (const userId in users) {
      const userData = users[userId].accountInfo;
      if (userData && userData.email === email) {
        const hashedPassword = userData.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
          return userId; // Return userId if user is found
        }
      }
    }
    // If user is not found, throw an error
    throw new Error("Invalid email or password");
  } catch (error) {
    console.error("Error getting user ID by email and password:", error);
    throw error;
  }
}
// Fetch user email and phone by id
export async function getUserInfoById(userId) {
  const userRef = ref(realtimeDb, `users/${userId}/accountInfo`);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      return userData;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}
// Fetch user personal info by id
export async function getUserPersonalInfoById(userId) {
  const userRef = ref(realtimeDb, `users/${userId}/personalInfo`);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const personalInfoData = snapshot.val();
      return personalInfoData;
    } else {
      throw new Error("User not found or personal info not available");
    }
  } catch (error) {
    console.error("Error fetching user personal info:", error);
    throw error;
  }
}
// Fetch and checks the user role by email and password
export async function getUserRoleByEmailAndPassword(email, password) {
  const usersRef = ref(realtimeDb, "users");
  try {
    const snapshot = await get(usersRef);
    console.log("Snapshot:", snapshot);
    if (!snapshot.exists()) {
      throw new Error("No users found");
    }
    let userRole = null;
    for (const childSnapshot of Object.values(snapshot.val())) {
      const userData = childSnapshot.accountInfo;
      if (userData && userData.email === email) {
        const hashedPassword = userData.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
          userRole = userData.role;
          break;
        }
      }
    }
    if (userRole === null) {
      throw new Error("Invalid email or password");
    }
    return userRole;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
}

// CREATE IN REALTIME DATABASE
// Add user in realtime database
export async function addUserAccountInfo(formData, userId) {
  try {
    const userRef = ref(realtimeDb, `users/${userId}/accountInfo`);
    const shopName = formData.inputShopName || "Not Applicable";
    await set(userRef, {
      password: formData.inputPass,
      phone: formData.inputPhone,
      email: formData.inputEmail,
      role: formData.selectedRole,
      shopName: shopName,
      status: "pending",
    });
    console.log("User added successfully to Realtime Database");
  } catch (error) {
    console.error("Error adding user to Realtime Database:", error);
  }
}
export async function addUserPersonalInfo(formData, userId) {
  try {
    const userRef = ref(realtimeDb, `users/${userId}/personalInfo`);
    await set(userRef, {
      firstName: formData.inputFName,
      lastName: formData.inputLName,
      birthdate: formData.inputBirthdate,
      gender: formData.selectedGender,
      image: formData.selectedImage,
    });
    console.log("User added successfully to Realtime Database");
  } catch (error) {
    console.error("Error adding user to Realtime Database:", error);
  }
}

// UPDATE DATAS IN REALTIME DATABASE
// Update Account info
export async function updateUserAccountInfo(userId, updatedUserData) {
  const { email, password, phone, role } = updatedUserData;
  const userDataRef = ref(realtimeDb, `users/${userId}/accountInfo`);
  try {
    if (phone) {
      const isExisting = await phoneExists(phone);
      if (isExisting) {
        throw new Error("Phone number already exists");
      }
    }
    await Promise.all([
      email && update(userDataRef, { email }),
      password && update(userDataRef, { password }),
      phone && update(userDataRef, { phone }),
      role && update(userDataRef, { role }),
    ]);
    console.log("User account info updated successfully");
  } catch (error) {
    console.error("Error updating user account info:", error);
    throw error;
  }
}
// Update Personal info
export async function updateUserPersonalInfo(userId, updatedPersonalInfo) {
  const {
    firstName,
    lastName,
    birthdate,
    gender,
    street,
    barangay,
    municipality,
    province,
    zip,
  } = updatedPersonalInfo;
  const userPersonalInfoRef = ref(realtimeDb, `users/${userId}/personalInfo`);
  try {
    await Promise.all([
      firstName && update(userPersonalInfoRef, { firstName }),
      lastName && update(userPersonalInfoRef, { lastName }),
      birthdate && update(userPersonalInfoRef, { birthdate }),
      gender && update(userPersonalInfoRef, { gender }),
      street && update(userPersonalInfoRef, { street }),
      barangay && update(userPersonalInfoRef, { barangay }),
      municipality && update(userPersonalInfoRef, { municipality }),
      province && update(userPersonalInfoRef, { province }),
      zip && update(userPersonalInfoRef, { zip }),
    ]);
    console.log("User personal info updated successfully");
  } catch (error) {
    console.error("Error updating user personal info:", error);
    throw error;
  }
}

// CHECKS IF FIELD ALREADY EXISTS IN REALTIME DATABASE
// Checks if email already exists
export async function emailExists(email) {
  const usersRef = ref(realtimeDb, "users");
  try {
    const snapshot = await get(usersRef);
    let emailExists = false;
    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();
      if (
        userData &&
        userData.accountInfo &&
        userData.accountInfo.email === email
      ) {
        emailExists = true;
        return;
      }
    });
    return emailExists;
  } catch (error) {
    console.error("Error checking if email exists:", error);
    throw error;
  }
}

// Checks if phone already exists
export async function phoneExists(phone) {
  const usersRef = ref(realtimeDb, "users");
  try {
    const snapshot = await get(usersRef);
    let phoneExists = false;
    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();
      if (
        userData &&
        userData.accountInfo &&
        userData.accountInfo.phone === phone
      ) {
        phoneExists = true;
        return;
      }
    });
    return phoneExists;
  } catch (error) {
    console.error("Error checking if phone exists:", error);
    throw error;
  }
}

export async function getShopNameByEmailAndPassword(email, password) {
  const usersRef = ref(realtimeDb, "users");
  try {
    const snapshot = await get(usersRef);
    console.log("Snapshot:", snapshot);
    if (!snapshot.exists()) {
      throw new Error("No users found");
    }

    let shopName = null;
    for (const childSnapshot of Object.values(snapshot.val())) {
      const userData = childSnapshot.accountInfo;
      if (userData && userData.email === email) {
        const hashedPassword = userData.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
          shopName = userData.shopName;
          break;
        }
      }
    }
    if (shopName === null) {
      throw new Error("Invalid email or password");
    }
    return shopName;
  } catch (error) {
    console.error("Error fetching shop name:", error);
    throw error;
  }
}