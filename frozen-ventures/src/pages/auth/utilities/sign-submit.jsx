import { useState } from "react";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import {
  doSignInWithEmailAndPassword,
  doSendEmailVerification,
  doDeleteUserWithEmailAndPassword,
} from "../../../firebase/firebase-auth";

async function getUserByEmailAndPassword(email, password) {
  const db = getFirestore();
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      const userData = doc.data();
      if (userData.email === email && userData.password === password) {
        return doc.id;
      }
    }
    return null;
  } catch (error) {
    console.error("ERROR Fetching UserID:", error);
    return null;
  }
}

export function useFormSubmit() {
  const [errors, setErrors] = useState([]);

  const submitForm = async (formData) => {
    const {
      inputFName,
      inputLName,
      inputPass,
      inputPhone,
      inputEmail,
      inputBirthdate,
      selectedRole,
      selectedGender,
      selectedImage,
    } = formData;

    const formErrors = [];

    if (
      !inputFName ||
      !inputLName ||
      !inputPhone ||
      !inputEmail ||
      !inputBirthdate ||
      !inputPass ||
      !selectedRole ||
      !selectedGender ||
      !selectedImage
    ) {
      formErrors.push("All fields are required");
    }

    if (formErrors.length === 0) {
      const db = getFirestore();
      try {
        const userRef = await addDoc(collection(db, "users"), {
          email: inputEmail,
          password: inputPass,
          role: selectedRole,
        });

        await addDoc(collection(db, "personalInfo"), {
          firstName: inputFName,
          lastName: inputLName,
          phoneNum: inputPhone,
          birthdate: inputBirthdate,
          gender: selectedGender,
          user: userRef.id,
        });

        setTimeout(async () => {
          const userId = await getUserByEmailAndPassword(inputEmail, inputPass);
          if (userId === null) {
            await doDeleteUserWithEmailAndPassword(inputEmail, inputPass);
            await userRef.delete();
          } else {
            try {
              await doSignInWithEmailAndPassword(inputEmail, inputPass);
              await doSendEmailVerification();
            } catch (error) {
              console.error("ERROR Signing In:", error);
            }
          }
        }, 3000);
      } catch (error) {
        console.error("ERROR adding document: ", error);
        formErrors.push("An error occurred. Please try again later");
      }
    }

    setErrors(formErrors);
  };

  return { errors, setErrors, submitForm };
}