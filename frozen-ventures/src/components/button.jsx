import React from "react";

export const Button = ({ onClick, buttonText }) => {
  return (
    <button onClick={onClick}>
      {buttonText}
    </button>
  );
};
