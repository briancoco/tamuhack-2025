import React, { useState } from "react";

export default function CollapsibleSidebar({isOpen, setIsOpen, questions, currentQuestion, setCurrentQuestion, setPlaying}) {
  const [choice, setChoice] = useState(null);

  const handleSubmit = () => {
    setCurrentQuestion(currentQuestion + 1)
    setIsOpen(false)
    setPlaying(true)
    setChoice(null)
  }

  return (
    <div className="Sidebar">
      {isOpen && 
        <div className="sidebar-container">
          <p className="question-title">{questions[currentQuestion].question}</p>
          <section className="question-options">
            {questions[currentQuestion].options.map((option, index) => (
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
            <div>{`${currentQuestion + 1}/${questions.length}`}</div>
            <button className="question-button" onClick={handleSubmit}>Submit</button>
          </section>
        </div>
      }
      
    </div>
  );
}