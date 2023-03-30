import { useContext, useEffect, useState } from "react";
import { ActiveWordStateType } from "../components/TypingArea/TypingArea";
import { typingContext } from "../store/typingStore";
import { TOTAL_WORDS } from "../utils/constants";
import { generateCharState } from "../utils/generateCharState";
import { generateWords } from "../utils/generateWords";
import useTimer from "./useTimer";
const dummWords = generateWords()
const DEFAULT_STATE = {
    words: dummWords,
    wordIndex: 0,
    word: dummWords[0],
    index: 0,
    charState: generateCharState(dummWords),
    extras: {},
    wordDetails: new Map<number, boolean>(),
    currentLine: 0
};
export function useTyping() {
    const [activeWord, setActiveWord] = useState<ActiveWordStateType>(DEFAULT_STATE);
    const { time, startTimer, resetTimer, timerState, restart } = useTimer();
    const ctx = useContext(typingContext);
    const setDefaultState = () => {
        //TODO set default state but how to get rid of dummword and add quality code
        const newWords = generateWords();
        setActiveWord({
            words: newWords,
            wordIndex: 0,
            word: newWords[0],
            charState: generateCharState(newWords),
            extras: {},
            wordDetails: new Map<number, boolean>(),
            currentLine: 0,
            index: 0
        })
    }
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            // console.log(event)
            if (!(event.code.startsWith("Key") || event.code.startsWith("Digit") || event.code.startsWith("Space") || event.code.startsWith("Backspace"))) {
                return
            }

            if (timerState === "start") {
                //
                startTimer();
            }
            if (event.key === "Backspace") {
                if (activeWord.index === 0) {
                    if (activeWord.wordIndex != 0 && !activeWord.wordDetails.get(activeWord.wordIndex - 1)) {
                        //go to prev word iff it is not typed fully correctly.
                        setActiveWord((prevState) => {
                            const newState = { ...prevState };
                            newState.wordIndex -= 1;
                            newState.word = newState.words[newState.wordIndex]
                            newState.index = newState.words[newState.wordIndex].length - 1;
                            newState.charState[newState.wordIndex][newState.words[newState.wordIndex].length - 1] = 0;
                            return newState;
                        })
                    }
                    return

                }
                // console.log(activeWord.wordDetails.get(activeWord.wordIndex));
                if (activeWord.extras[activeWord.wordIndex] && activeWord.extras[activeWord.wordIndex].length > 0) {
                    //REMOVE EXTRAS if it exists 
                    setActiveWord((prev) => {
                        const newState = { ...prev };
                        const length = newState.extras[activeWord.wordIndex].length - 1
                        newState.extras[activeWord.wordIndex] = newState.extras[activeWord.wordIndex].slice(0, length)
                        if (newState.extras[activeWord.wordIndex].length === 0) {
                            delete newState.extras[activeWord.wordIndex]
                        }
                        return newState
                    })

                    
                }

                else if (!activeWord.wordDetails.get(activeWord.wordIndex)) {
                    //go back by one character in current word
                    setActiveWord((prev) => {
                        const newCharState = { ...prev.charState };
                        newCharState[prev.wordIndex] = newCharState[prev.wordIndex].map((cs, index) => index === prev.index - 1 ? 0 : cs)
                        return { ...prev, index: prev.index - 1, charState: newCharState }
                    })
                }
                else if (activeWord.wordDetails.get(activeWord.wordIndex)) {
                    //don;t do anything if word is typed correctly
                }
                else {
                    if(activeWord.wordIndex===0){
                        return
                    }
                    setActiveWord(prev => {
                        const newState = { ...prev };
                        if (newState.charState[newState.wordIndex - 1].includes(-1)) {
                            //go to previous word with last character index
                            newState.wordIndex--;
                            newState.word = newState.words[newState.wordIndex];
                            newState.index = newState.word.length - 1;
                            newState.charState[newState.wordIndex][newState.index] = 0;
                        }
                        return newState
                    })
                }
                return
            }
            if (event.key === " ") {
                setActiveWord((prevState) => {
                    const newState = { ...prevState };
                    if (newState.index < newState.word.length) {
                        //go to new word.
                        // console.log("IS HERE")
                        //!add missed to store and implement here
                        for (let i = newState.index; i < newState.word.length; i++) {
                            newState.charState[newState.wordIndex][i] = -1
                        }
                    }
                    newState.wordIndex++;
                    if (newState.wordIndex % TOTAL_WORDS == 0) {
                        newState.currentLine = newState.currentLine + TOTAL_WORDS;
                        const newWords = generateWords();
                        newState.words.push(...newWords)
                        console.log(newState.charState)
                        const newCharState: number[][] = [];
                        for (let i in newState.charState) {
                            newCharState.push(newState.charState[i])
                        }
                        newCharState.push(...generateCharState(newWords))
                        newState.charState = newCharState
                    }
                    // console.log(newState)
                    newState.index = 0;
                    newState.word = newState.words[newState.wordIndex]
                    console.log(newState)
                    return newState
                })
                return
            }
            if (activeWord.index === activeWord.word.length) {
                //record extras
                //!add extra to the store and increment here
                setActiveWord((prevState) => {
                    const newState = { ...prevState };
                    if (newState.extras[`${newState.wordIndex}`]) {
                        newState.extras[`${newState.wordIndex}`] += event.key;

                    } else {
                        newState.extras[`${newState.wordIndex}`] = event.key
                    }
                    return newState;
                })
                return
            }
            if (event.key === activeWord.word.charAt(activeWord.index)) {
                // ctx.setCorrectCharacter("increase")
                // character matched successfully

                setActiveWord((prevState) => {
                    const newState = { ...prevState };
                    newState.charState[newState.wordIndex] = newState.charState[newState.wordIndex].map((cs, index) => index === prevState.index ? 1 : cs)
                    // console.log(newState.charState[newState.wordIndex])
                    newState.index = newState.index + 1;
                    if (newState.index == newState.word.length) {

                        newState.wordDetails.set(newState.wordIndex, newState.charState[newState.wordIndex].every((item) => item === 1));
                    }
                    return newState

                })

            } else {
                //user typed wrong character
                // ctx.setIncorrectCharacter("increase")
                setActiveWord((prevState) => {
                    const newState = { ...prevState };
                    newState.charState[newState.wordIndex] = newState.charState[newState.wordIndex].map((cs, index) => index === prevState.index ? -1 : cs)
                    newState.index = newState.index + 1;
                    if (newState.index == newState.word.length) {
                        newState.wordDetails.set(newState.wordIndex, newState.charState[newState.wordIndex].every((item) => item === 1));
                    }
                    return newState
                })
            }

        }
        if (timerState === "finish") {
            // console.log("DSFg")
            ctx.setIsFinished()
            document.removeEventListener('keydown', listener)
            return
        }
        document.addEventListener('keydown', listener)
        return () => {
            document.removeEventListener('keydown', listener)
        }
    }, [activeWord, timerState])
    return { ...activeWord, time, restart, setDefaultState }
}