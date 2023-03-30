import React, { useState } from 'react'
import { typingContext, TypingContextType } from '../../store/typingStore'
type TypingContextProviderType = {
    children: React.ReactNode
}
function TypingContextProvider({ children }: TypingContextProviderType) {
    const [result, setResult] = useState<Pick<TypingContextType, "correctCharacters" | "inCorrectCharacters" | "correctWords" | "isFinished" | "totalChracters" | "extraCharacter">>({
        isFinished: false,
        // totalWords: 0,
        extraCharacter: 0,
        correctCharacters: 0,
        totalChracters: 0,
        correctWords: 0,
        inCorrectCharacters: 0
    })
    const setIsFinished = () => {
        setResult(prev => ({ ...prev, isFinished: true }))
    }
    const setCorrectCharacter: TypingContextType["setCorrectCharacter"] = (charCountState) => {
        setResult((prev) => ({ ...prev, correctCharacters: charCountState === "increase" ? prev.correctCharacters + 1 : prev.correctCharacters - 1, totalChracters: charCountState === "increase" ? prev.totalChracters + 1 : prev.totalChracters - 1 }))
    }
    const setIncorrectCharacter: TypingContextType["setIncorrectCharacter"] = (charCountState) => {
        setResult((prev) => ({ ...prev, inCorrectCharacters: charCountState === "increase" ? prev.inCorrectCharacters + 1 : prev.inCorrectCharacters - 1, totalChracters: charCountState === "increase" ? prev.totalChracters + 1 : prev.totalChracters - 1 }))
    }
    const setWord: TypingContextType['setWord'] = (wordCountState) => {

    }
    const setExtra: TypingContextType['setExtra'] = (extraCountState) => {

    }
    const setResultToDefault=()=>{
        setResult({
            isFinished:false,
            extraCharacter:0,
            correctCharacters:0,
            totalChracters:0,
            correctWords:0,
            inCorrectCharacters:0
        })
    }
    return (
        <typingContext.Provider value={{ ...result, setIsFinished, setCorrectCharacter, setIncorrectCharacter, setWord, setExtra,setResultToDefault }}>
            {children}
        </typingContext.Provider>
    )
}

export default TypingContextProvider