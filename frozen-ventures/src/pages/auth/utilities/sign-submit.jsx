import { useState } from "react";
import { getFirestore, addDoc, collection } from "firebase/firestore";

export function useFormSubmit() {
  const [errors, setErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState("");

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
