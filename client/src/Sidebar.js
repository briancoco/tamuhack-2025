import React, { useState } from "react";
import ReactConfetti from 'react-confetti';

export default function CollapsibleSidebar({isOpen, setIsOpen, questions, currentQuestion, setCurrentQuestion, setPlaying}) {
  const [choice, setChoice] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false); 

  const handleSubmit = () => {
    const answer = questions[currentQuestion].correctAnswer;

    if (choice === answer) {
      console.log("hooray, right answer");
      setShowConfetti(true); 
    } else {
      console.log("boo, wrong answer");
    }
    
    setTimeout(() => {
      setShowConfetti(false);
      setIsOpen(false);
      setPlaying(true);
      setChoice(null);
      setCurrentQuestion(currentQuestion + 1);
    }, 3000); 
  };

  return (
    <div className="Sidebar">
      {showConfetti && <ReactConfetti gravity={0.3}/> }
      
      {isOpen && 
        <div className="sidebar-container">
          <p className="question-title">{questions[currentQuestion].question}</p>
          <section className="question-options">
            {questions[currentQuestion].options.map((option, index) => (
              <div className="question-option" key={index}>
                <input
                  type="radio"
                  value={option}
                  checked={choice === option}
                  onChange={() => setChoice(option)}
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

