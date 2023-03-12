import React from 'react'
import Character from '../Character/Character'
import style from './word.module.css'
type WordPropType={
    word:string,
    active:boolean,
    activeWord:{
        word:string,
        index:number,
        wordIndex:number
    }
    charState:number[]
    hasCursor:boolean
    cursor:number
}
function Word(props:WordPropType) {
    // console.log(props.word)
    // console.log(props.charState);
    return (
        <div  className={style.word}>{
        props.word.split("").map((character,index)=>{
            // console.log(props.activeWord)
            return <Character  state={props.charState[index]}  cursorLocation={props.hasCursor && index===props.cursor}  key={index} char={character}/>
        })

        }</div>
  )
}

export default Word

// cursorLocation={props.hasCursor && index===props.cursor} 