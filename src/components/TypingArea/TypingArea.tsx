import React, { useContext } from 'react'
import Word from '../Word/Word';
import styles from './TypingArea.module.css'
import Space from '../Space/Space';
import Extra from '../Extra/Extra';
import { useTyping } from '../../hooks/useTyping';
import { TOTAL_WORDS } from '../../utils/constants';
import { typingContext } from '../../store/typingStore';

export type ActiveWordStateType = {
    words: string[];
    wordIndex: number;
    word: string;
    index: number;
    charState: number[][];
    extras: { [key: string]: string };
    wordDetails: Map<number, boolean>;
    currentLine: number
}

function TypingArea() {
    const { charState, extras, word, words, index: charIndex, wordIndex, wordDetails, currentLine,time,restart,setDefaultState } = useTyping();
    const ctx=useContext(typingContext);
    return (
        <div >
            <div>time:{time}</div>
            <div className={styles.typingArea}>
                {words.map((word, index) => {
                    if (index >= currentLine && index < currentLine + TOTAL_WORDS) {

                        return <React.Fragment key={index} >
                            <Word active={index === charIndex} hasCursor={index === wordIndex} cursor={charIndex} charState={charState[index]} word={word} />
                            <Extra extraData={extras[index]} />
                            <Space hasCursor={index === wordIndex && charIndex === word.length} />
                        </React.Fragment>
                    } else {
                        return <React.Fragment key={index}></React.Fragment>
                    }

                })}
            </div>
            <div>
                <button onClick={()=>{
                    restart()
                    setDefaultState()
                    ctx.setResultToDefault()    
                    }}>restart</button>
            </div>
        </div>
    )
}

export default TypingArea