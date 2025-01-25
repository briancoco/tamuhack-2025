import React from 'react'
import ReactPlayer from 'react-player'

const Player = () => {
  return (
    <div>
      <div className='player-container'>
        <ReactPlayer
          className="react-player"
          url='https://www.youtube.com/watch?v=a3ICNMQW7Ok' 
        />
        <section className='player-settings'>
          
        </section>
      </div>
    </div>
  )
}

export default Player