import React from 'react'
import { TextField, Button } from '@radix-ui/themes'
import './home.css'


const Home = () => {
  return (
    <div className='container'>
      <div className='content'>
        <h1 className='title'>-MumboJumbo.</h1>
        <input className='textfield' type="text" placeholder='Enter youtube url'></input>
        <Button className='searchButton'>Search</Button>
      </div>
    </div>
  )
}

export default Home