import { useState } from "react";
import {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSendEmailVerification,
} from "../../../firebase/firebase-auth";
import { createUserWithPersonalInfo } from "../../../firebase/firebase-operations";

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

    const formErrors = [];

    try {
      await doCreateUserWithEmailAndPassword(inputEmail, inputPass);

      try {
        await doSignInWithEmailAndPassword(inputEmail, inputPass);

        try {
          const userData = {
            email: inputEmail,
            password: inputPass,
            role: selectedRole,
            userId: "1",
          };
          const personalInfo = {
            firstName: inputFName,
            lastName: inputLName,
            birthdate: inputBirthdate,
            gender: selectedGender,
            phone: inputPhone,
            document: imageValue,
          };
          try {
            await createUserWithPersonalInfo(userData, personalInfo);

            try {
              await doSendEmailVerification();
            } catch (error) {
              formErrors.push("Failed to send email verification");
              console.error("ERROR:", error);
            }
          } catch (error) {
            formErrors.push("Failed to create account");
            console.log("ERROR:", error);
          }
        } catch (error) {
          formErrors.push("Failed to create account");
          console.log("ERROR:", error);
        }
      } catch (error) {
        formErrors.push("Failed to sign in new account");
        console.error("ERROR:", error);
      }
    } catch (error) {
      formErrors.push("Failed to create account");
      console.log("ERROR:", error);
    }
    setErrors(formErrors);
  };
  return { errors, setErrors, submitForm };
}
