import React, { useState } from "react";
import ReactConfetti from 'react-confetti';
import IncorrectModal from "./util/IncorrectModal";
import CorrectModal from "./util/CorrectModal";

export default function CollapsibleSidebar({isOpen, setIsOpen, questions, currentQuestion, setCurrentQuestion, setPlaying}) {
  const [choice, setChoice] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSubmit = () => {
    const answer = questions[currentQuestion].correctAnswer;

    if (choice === answer) {
      console.log("hooray, right answer");
      setShowConfetti(true); 
      setShowCorrectModal(true);
      setButtonText("Continue");
      const correctOptionElement = document.querySelector(`input[value="${answer}"]`).nextSibling;
      correctOptionElement.style.backgroundColor = "green";
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000); 
    } else {
      console.log("boo, wrong answer");
      const correctOptionElement = document.querySelector(`input[value="${answer}"]`).nextSibling;
      const selectedOptionElement = document.querySelector(`input[value="${choice}"]`).nextSibling;
      selectedOptionElement.style.backgroundColor = "red";
      correctOptionElement.style.backgroundColor = "green";
      setCorrectAnswer(answer);
      setShowModal(true);
      setButtonText("Continue");
    }
  };

  const handleCloseModal = (continuePlaying = false) => {
    setShowModal(false);
    setShowCorrectModal(false);
    if (continuePlaying) {
      setIsOpen(false);
      setPlaying(true);
      setChoice(null);
      setCurrentQuestion(currentQuestion + 1);
      setButtonText("Submit");
      setShowConfetti(false);

      // Reset styles for the options
      const options = document.querySelectorAll('.question-option label');
      options.forEach(option => {
        option.style.backgroundColor = "";
      });
    }
  };

  const handleNext = () => {
    handleCloseModal(true);
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
            <button className="question-button" onClick={buttonText === "Submit" ? handleSubmit : handleNext}>{buttonText}</button>
          </section>
        </div>
      }
      {showModal && <IncorrectModal open={showModal} handleClose={() => handleCloseModal(false)} correctAnswer={correctAnswer} />} 
      {showCorrectModal && <CorrectModal open={showCorrectModal} handleClose={handleNext} />} 
    </div>
  );
}

