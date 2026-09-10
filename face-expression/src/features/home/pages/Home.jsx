import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Nav from '../../shared/components/Nav'
import Player from "../../home/components/Player"
import { useSong } from '../hooks/useSong'

const Home = () => {

  const { handleGetSong } = useSong()
  return (
    <div>
      <Nav/>
   <FaceExpression
  onClick={(expression) => {
    console.log("MOOD FROM FACE:", expression)
    handleGetSong({ mood: expression })
  }}
/>
      
      <Player />
    </div>
  )
}

export default Home
