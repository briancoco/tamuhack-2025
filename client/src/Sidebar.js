import React, { useState } from "react";
import {ToggleGroup} from "radix-ui"

export default function CollapsibleSidebar({isOpen}) {
  const [question, setQuestion] = useState({
    description: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"]
  });
  const [choice, setChoice] = useState(null);

  return (
    <div className="Sidebar">
      {isOpen && 
        <div className="sidebar-container">
          <p className="question-title">{question.description}</p>
          <section className="question-options">
            {question.options.map((option, index) => (
              <div className="question-option">
              <input
                type="radio"
                value={option}
                checked={choice === index}
                onChange={() => setChoice(index)}
                className="form-radio"
              />
              <label>{option}</label>
              </div>
            ))}
          </section>
          <section className="question-buttons">
            <button className="question-button">Skip</button>
            <div>1/5</div>
            <button className="question-button">Next</button>
          </section>
        </div>
      }
      
    </div>
  );
}