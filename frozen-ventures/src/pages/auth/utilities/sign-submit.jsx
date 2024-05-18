import { useState } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSendEmailVerification,
} from "../../../firebase/firebase-auth";
import {
  addUserAccountInfo,
  addUserPersonalInfo,
  getLatestUserId,
} from "../../../firebase/firebase-users";
import { IdGenerator } from "./id-generator";

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

    try {
      // Create user with email and password
      await doCreateUserWithEmailAndPassword(inputEmail, inputPass);

      // Get latest userId and generate new userId
      const latestUserId = await getLatestUserId();
      const userId = IdGenerator(latestUserId);

      // Initialize imageValue with a default value
      let imageValue = "Not Applicable";

      // Check if selectedImage is available
      if (selectedImage) {
        try {
          // Read and convert selectedImage to base64
          imageValue = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(selectedImage);
          });
        } catch (error) {
          console.error("Error reading image:", error);
          formErrors.push("Error reading image");
        }
      }

      // Add user account info
      await addUserAccountInfo(
        {
          inputPass,
          inputPhone,
          inputEmail,
          selectedRole,
        },
        userId
      );

      // Add user personal info
      await addUserPersonalInfo(
        {
          inputFName,
          inputLName,
          inputPass,
          inputBirthdate,
          selectedGender,
          selectedImage: imageValue,
        },
        userId
      );
    } catch (error) {
      formErrors.push("Failed to create account or store data");
      console.error("ERROR:", error);
    }

    // Update errors state with formErrors
    setErrors(formErrors);
  };

  // Return errors and submitForm function
  return { errors, submitForm };
}