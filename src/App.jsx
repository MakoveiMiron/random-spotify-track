import { useState } from 'react'
import { getTrack } from './apicall'
import './App.css'

function App() {

  return (
    <>
      <div>
        <button onClick={() => getTrack()}>Search for random track on Spotify!</button>       
      </div>
    </>
  )
}

export default App
