import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router';
import ReactPlayer from 'react-player'
import CollapsibleSidebar from './Sidebar'

import './Player.css';

const Player = () => {
  const location = useLocation();
  const [playing, setPlaying] = useState(true)
  const [activeQuestion, setActiveQuestion] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [url, setUrl] = useState(null)
  //call api in a useEffect => get video questions

  useEffect(() => {
    console.log(location.state.questions)
    setQuestions(location.state.questions.questions)
    setUrl(location.state.youtubeLink)
  }, [])

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
      {url && questions &&
        <div className='player-container'>
        <div>
          <button onClick={() => setActiveQuestion(!activeQuestion)}>Open Question</button>
          <ReactPlayer
            className="react-player"
            controls={true}
            width={activeQuestion ? "640px" : "1280px"}
            height={activeQuestion ? "360px" : "720px"}
            url={url} 
            onProgress={progressHandler}
            playing={playing}
          />
        </div>
        <CollapsibleSidebar className={`collapsible-sidebar ${activeQuestion ? 'open' : 'closed'}`} isOpen={activeQuestion} setIsOpen={setActiveQuestion} questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} setPlaying={setPlaying} />
      </div>
    }
      
    </div>
  )
}

export default Player