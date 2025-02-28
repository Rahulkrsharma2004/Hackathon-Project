import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Welcome To The Frontend Voice Assistant</h1>
        <img src={reactLogo} alt="React Logo" />
      </div>
    </>
  )
}

export default App
