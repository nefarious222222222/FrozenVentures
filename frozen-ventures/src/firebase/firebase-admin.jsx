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
        userData.accountInfo &&
        userData.accountInfo.role !== "Admin"
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
