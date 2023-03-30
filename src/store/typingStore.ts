import { createContext } from "react";
export type TypingContextType={
    isFinished:boolean,
    totalChracters:number,
    correctCharacters:number,
    inCorrectCharacters:number,
    correctWords:number,
    extraCharacter:number
    setIsFinished:()=>void,
    setCorrectCharacter:(arg0:"increase"|"decrease")=>void,
    setIncorrectCharacter:(arg0:"increase"|"decrease")=>void
    setWord:(arg0:"increase"|"decrease")=>void,
    setExtra:(arg0:"increase"|"decrease")=>void,
    setResultToDefault:()=>void

}
export const typingContext=createContext<TypingContextType>({
    isFinished:false,
    totalChracters:0,
    correctCharacters:0,
    inCorrectCharacters:0,
    correctWords:0,
    extraCharacter:0,
    setCorrectCharacter:()=>{},
    setIncorrectCharacter:()=>{},
    setWord:()=>{},
    setExtra:()=>{},
    setIsFinished:()=>{},
    setResultToDefault:()=>{}
})
