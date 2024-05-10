import { useState } from "react";
import { getFirestore, addDoc, collection, doc, getDoc } from "firebase/firestore";
import { emailExists } from "../../firebase/firebase-operations";
import {
  validateContactNumber,
  validateEmail,
  validatePassword,
  validateImage,
} from "./signup-validation";
import { validateUser } from "../../firebase/firebase-operations";

export function useFormSubmit() {
  const [errors, setErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState("");

  const submitForm = async (formData) => {
    const {
      inputFName,
      inputLName,
      inputPass,
      inputCPass,
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

    if (inputPass.length < 8) {
      formErrors.push("Password must be at least 8 characters long");
    }

    if (inputPass !== inputCPass) {
      formErrors.push("Passwords do not match");
    }

    if (!validateContactNumber(inputPhone)) {
      formErrors.push("Contact number is not valid");
    }

    if (!validateEmail(inputEmail)) {
      formErrors.push("Email is not valid");
    }

    const emailExistsResult = await emailExists(inputEmail);
    if (emailExistsResult) {
      formErrors.push("Email Already Exists");
    }

    if (!validatePassword(inputPass)) {
      formErrors.push("Password requires 1 uppercase and 1 symbol");
    }

    if (!validateImage(selectedImage)) {
      formErrors.push("Wrong file type or reached max limit mb");
    }

    if (formErrors.length === 0) {
      const db = getFirestore();
      try {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(selectedImage);
        fileReader.onload = async () => {
          const imageData = fileReader.result;
          await addDoc(collection(db, "users"), {
            firstName: inputFName,
            lastName: inputLName,
            phoneNum: inputPhone,
            emailAdd: inputEmail,
            birthdate: inputBirthdate,
            password: inputPass,
            role: selectedRole,
            gender: selectedGender,
            document: imageData,
          });
          setFormSuccess("Account created successfully");

          setTimeout(async () => {
            const db = getFirestore();
            const userId = await validateUser(inputEmail, inputPass);
            if (userId) {
              try {
                const userDocRef = doc(db, "users", userId);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                  const userData = userDocSnapshot.data();
                  const userRole = userData && userData.role;
                  if (userRole) {
                    sessionStorage.setItem("userId", userId);
                    sessionStorage.setItem("userRole", userRole);
                    console.log(sessionStorage.setItem("userId", userId), sessionStorage.setItem("userRole", userRole))
                    window.location.href = "/";
                  } else {
                    console.error("User role not found.");
                  }
                } else {
                  console.error("Document does not exist.");
                }
              } catch (error) {
                console.error("Failed to sign:", error);
              }
            }
          }, 1000);
        };  
      } catch (error) {
        console.error("Error adding document: ", error);
        formErrors.push("An error occurred. Please try again later");
      }
    }

    setErrors(formErrors);
  };

  return { errors, setErrors, formSuccess, submitForm };
}
