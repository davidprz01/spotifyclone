import React from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Display from "./components/Display"
import Player from './components/Player'


function App() {
  return (
    <div className = "h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player/>
    </div>
  )
}

export default App
