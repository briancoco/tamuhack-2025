import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import Sidebar from './Sidebar'
import CollapsibleSidebar from './Sidebar'
import './Player.css';

const Player = () => {
  const [playing, setPlaying] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(false);
  

  return (
    <div>
      <div className='player-container'>
        <div>
          <button onClick={() => setActiveQuestion(!activeQuestion)}>Open Question</button>
          <ReactPlayer
            className="react-player"
            controls={true}
            width={activeQuestion ? "640px" : "1280px"}
            height={activeQuestion ? "360px" : "720px"}
            url='https://www.youtube.com/watch?v=a3ICNMQW7Ok' 
          />
        </div>
        <CollapsibleSidebar className={`collapsible-sidebar ${activeQuestion ? 'open' : 'closed'}`} isOpen={activeQuestion} />
      </div>
    </div>
  )
}

export default Player