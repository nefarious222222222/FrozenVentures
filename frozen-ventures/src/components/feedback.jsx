import React, { useState } from "react";
import "../assets/styles/feedback.css";
import { X, Star } from "phosphor-react";
import { motion as m } from "framer-motion";

export const Feedback = ({ onClose }) => {
  const [feedbackText, setFeedbackText] = useState("");

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedbackText);
    onClose();
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="feedback"
    >
      <X className="x-button" size={32} onClick={handleCancel} />
      <div className="header">
        <h2>Give Feedback</h2>
        <p>What do you think of FrozenVentures?</p>
        <div className="rating">
          <Star className="star" size={40} />
          <Star className="star" size={40} />
          <Star className="star" size={40} />
          <Star className="star" size={40} />
          <Star className="star" size={40} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label forHtml="feeback">Do you have any thoughts you'd like to share?</label>
        <textarea
          id="feeback"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        ></textarea>

        <div className="buttons">
          <button type="submit">Send</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </m.div>
  );
};
