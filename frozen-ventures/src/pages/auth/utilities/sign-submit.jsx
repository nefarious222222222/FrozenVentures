import { useState } from "react";
import bcrypt from "bcryptjs";
import { doCreateUserWithEmailAndPassword, doSignOut } from "../../../firebase/firebase-auth";
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
      const hashedPassword = await bcrypt.hash(inputPass, 10);

      await doCreateUserWithEmailAndPassword(inputEmail, inputPass);
      const latestUserId = await getLatestUserId();
      const userId = IdGenerator(latestUserId);
      let imageValue = "Not Applicable";
      if (selectedImage) {
        try {
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
      await addUserAccountInfo(
        {
          inputPass: hashedPassword,
          inputPhone,
          inputEmail,
          selectedRole,
        },
        userId
      );
      await addUserPersonalInfo(
        {
          inputFName,
          inputLName,
          inputPass: hashedPassword,
          inputBirthdate,
          selectedGender,
          selectedImage: imageValue,
        },
        userId
      );
      doSignOut();
    } catch (error) {
      formErrors.push("Failed to create account or store data");
      console.error("ERROR:", error);
    }
    setErrors(formErrors);
  };
  return { errors, submitForm };
}