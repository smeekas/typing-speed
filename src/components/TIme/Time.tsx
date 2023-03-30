import React, { useContext } from 'react'
import { typingContext } from '../../store/typingStore'

function Time() {
    const ctx=useContext(typingContext);
  return (
    <div>Time</div>
  )
}

export default Time