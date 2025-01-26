import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import Sidebar from './Sidebar'
import CollapsibleSidebar from './Sidebar'
import './Player.css';

const Player = () => {
  const [playing, setPlaying] = useState(true)
  const [activeQuestion, setActiveQuestion] = useState(false);
  const [questions, setQuestions] = useState(
      [
        {
            "number": 1,
            "startTime": "5",
            "duration": "1",
            "question": "¿Qué porcentaje de la población mundial habría ganado el punto?",
            "options": [
                "a) 95%",
                "b) 99%",
                "c) 90%",
                "d) 97%"
            ],
            "correctAnswer": "b) 99%"
        },
        {
            "number": 2,
            "startTime": "9",
            "duration": "1",
            "question": "¿Qué tenía el jugador en la pierna?",
            "options": [
                "a) Una venda",
                "b) Una lesión",
                "c) Un vendaje",
                "d) Una marca"
            ],
            "correctAnswer": "a) Una venda"
        },
        {
            "number": 3,
            "startTime": "150.319",
            "duration": "4.081",
            "question": "¿Qué miraba directamente el jugador?",
            "options": [
                "a) La pelota",
                "b) El sol",
                "c) La red",
                "d) El oponente"
            ],
            "correctAnswer": "b) El sol"
        },
        {
            "number": 4,
            "startTime": "154.4",
            "duration": "6.8",
            "question": "¿Qué demostró Sasha en esa jugada?",
            "options": [
                "a) Velocidad y fuerza",
                "b) Confianza y tiempo",
                "c) Habilidad y poder",
                "d) Técnica y control"
            ],
            "correctAnswer": "b) Confianza y tiempo"
        },
        {
            "number": 5,
            "startTime": "314.32",
            "duration": "3.319",
            "question": "¿Cómo fue el tiro drop de Zov?",
            "options": [
                "a) Excelente",
                "b) Regular",
                "c) Malo",
                "d) Perfecto"
            ],
            "correctAnswer": "c) Malo"
        },
        {
            "number": 6,
            "startTime": "320.84",
            "duration": "4.359",
            "question": "¿Qué estaba sintiendo el jugador?",
            "options": [
                "a) Tensión",
                "b) Alegría",
                "c) Cansancio",
                "d) Enojo"
            ],
            "correctAnswer": "a) Tensión"
        },
        {
            "number": 7,
            "startTime": "349.56",
            "duration": "4.96",
            "question": "¿Cómo fue el tiro de frente?",
            "options": [
                "a) Muy bueno",
                "b) Con suerte",
                "c) Malo",
                "d) Perfecto"
            ],
            "correctAnswer": "b) Con suerte"
        },
        {
            "number": 8,
            "startTime": "405.72",
            "duration": "7.4",
            "question": "¿Cómo fue el lob en ese momento del set?",
            "options": [
                "a) Fácil",
                "b) Regular",
                "c) Difícil",
                "d) Simple"
            ],
            "correctAnswer": "c) Difícil"
        },
        {
            "number": 9,
            "startTime": "465.36",
            "duration": "5.88",
            "question": "¿A qué final llegó el jugador?",
            "options": [
                "a) US Open",
                "b) Wimbledon",
                "c) Australian Open",
                "d) Roland Garros"
            ],
            "correctAnswer": "c) Australian Open"
        },
        {
            "number": 10,
            "startTime": "471.24",
            "duration": "8.639",
            "question": "¿Por qué terminó el partido?",
            "options": [
                "a) Por lluvia",
                "b) Por lesión",
                "c) Por tiempo",
                "d) Por abandono"
            ],
            "correctAnswer": "b) Por lesión"
        }
    ]);
    const [currentQuestion, setCurrentQuestion] = useState(0)
  //call api in a useEffect => get video questions

  const progressHandler = (playerData) => {
    console.log(playerData)
    const questionTime = parseFloat(questions[currentQuestion].startTime) + parseFloat(questions[currentQuestion].duration)
    const currentTime = playerData.playedSeconds
    if (currentTime >= questionTime) {
      //display current question
      setPlaying(false)
      setActiveQuestion(true)
    }
  }

  return (
    <div>
      <div className='player-container'>
        <div>
          {/* <button onClick={() => setActiveQuestion(!activeQuestion)}>Open Question</button> */}
          <ReactPlayer
            className="react-player"
            controls={true}
            width={activeQuestion ? "640px" : "1280px"}
            height={activeQuestion ? "360px" : "720px"}
            url='https://www.youtube.com/watch?v=a3ICNMQW7Ok' 
            onProgress={progressHandler}
            playing={playing}
          />
        </div>
        <CollapsibleSidebar className={`collapsible-sidebar ${activeQuestion ? 'open' : 'closed'}`} isOpen={activeQuestion} setIsOpen={setActiveQuestion} questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} setPlaying={setPlaying} />
      </div>
    </div>
  )
}

export default Player