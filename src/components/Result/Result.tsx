import React, { useContext } from 'react'
import { typingContext } from '../../store/typingStore'

function Result() {
    const ctx=useContext(typingContext);
  return (
    <div>
        <h1>correct: {ctx.correctCharacters}</h1>
        <h1>incorrect: {ctx.inCorrectCharacters}</h1>
        <h1>total: {ctx.totalChracters}</h1>

    </div>
  )
}

export default Result