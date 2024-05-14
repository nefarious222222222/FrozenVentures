import { getEmailByUid } from "../../../firebase/firebase-auth";
import {
  getFieldsByEmail,
  updateUserField,
  getRoleByUserId,
} from "../../../firebase/firebase-operations";

export async function InsertUserId(userId) {
  const email = await getEmailByUid(userId);
  const user = await getFieldsByEmail(email);
  const fieldName = "userId";

  if (!user) {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } else {
    if (user.userId == 1) {
      await updateUserField(email, fieldName, userId);
    } else {
      console.log("User Id already updated");
    }
  }
}

export async function CheckRoleById(userId) {
  try {
    const role = await getRoleByUserId(userId);
    if (userId && role) {
      return role !== "Customer";
    }
  } catch (error) {
    console.error("Error checking role for userId:", userId, error);
    throw error;
  }
}