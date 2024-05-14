import React, { useState } from "react";
import "../assets/styles/report-problem.css";
import { X } from "phosphor-react";
import { motion as m } from "framer-motion";

export const ReportProblem = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Report submitted:", { title, description });
    onClose();
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="report-problem"
    >
      <X className="x-button" size={32} onClick={handleCancel} />
      <h2>Report A Problem</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="title-problem">Title</label>
          <input
            id="title-problem"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="problem">Description</label>
          <textarea
            id="problem"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

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
