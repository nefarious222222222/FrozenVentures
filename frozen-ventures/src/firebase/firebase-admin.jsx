import { ref, get, set, update } from "firebase/database";
import { realtimeDb } from "./firebase-config";

export async function getAllUsers() {
  const usersRef = ref(realtimeDb, "users");
  try {
    const snapshot = await get(usersRef);
    const users = [];
    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();
      if (
        userData &&
        userData.accountInfo
      ) {
        const { accountInfo, personalInfo } = userData;
        users.push({
          id: childSnapshot.key,
          ...accountInfo,
          ...personalInfo,
        });
      }
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

//Filtering for admin-side users list
export async function getUsersByRole(role) {
  const usersRef = ref(realtimeDb, "users");
  try {
    const snapshot = await get(usersRef);
    const users = [];
    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();
      if (
        userData &&
        userData.accountInfo &&
        userData.accountInfo.role === role
      ) {
        const { accountInfo, personalInfo } = userData;
        users.push({
          id: childSnapshot.key,
          ...accountInfo,
          ...personalInfo,
        });
      }
    });
    return users;
  } catch (error) {
    console.error(`Error fetching ${role} users:`, error);
    throw error;
  }
}

export async function getAdmins() {
  return await getUsersByRole("Admin");
}

export async function getCustomers() {
  return await getUsersByRole("Customer");
}

export async function getRetailers() {
  return await getUsersByRole("Retailer");
}

export async function getDistributors() {
  return await getUsersByRole("Distributor");
}

export async function getManufacturers() {
  return await getUsersByRole("Manufacturer");
}

export const updateUserIsVerifiedStatus = async (userId, status) => {
  const userRef = ref(realtimeDb, `users/${userId}/accountInfo`);
  await update(userRef, { isVerified: status });
};

// Fetch all user info by id
export const fetchUserInfoById = async (userId) => {
  try {
    const userRef = ref(realtimeDb, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userInfo = snapshot.val();
      console.log("User Information:", userInfo);
      return userInfo;
    } else {
      console.log("No data available for the specified user ID.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw error;
  }
};

// Update the user info by id
export async function updateUserFirebase(userId, userData) {
  const userRef = ref(realtimeDb, `users/${userId}`);
  try {
    await set(userRef, userData);
    console.log("User updated successfully");
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Error updating user. Please try again.",
    };
  }
}
export const updateUserById = async (userId, updatedUserInfo) => {
  try {
    const existingUserInfo = await fetchUserInfoById(userId);
    const mergedUserInfo = {
      ...existingUserInfo,
      ...updatedUserInfo,
    };
    await updateUserFirebase(userId, mergedUserInfo);
    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Error updating user. Please try again.",
    };
  }
};