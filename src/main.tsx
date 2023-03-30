import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TypingContextProvider from './components/TypingContextProvider/TypingContextProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <TypingContextProvider>
    <App />
  </TypingContextProvider>
  ,
)
{/* </React.StrictMode> */ }
