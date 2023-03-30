import { useContext, useState } from 'react'
import './App.css'
import Result from './components/Result/Result';
import TypingArea from './components/TypingArea/TypingArea'
import { typingContext } from './store/typingStore';

function App() {
const ctx=useContext(typingContext);

  return (
    <div className="App">
    <TypingArea/>
    {ctx.isFinished && <Result/>}
    {/* <h2>sdfg</h2> */}
    </div>
  )
}

export default App
