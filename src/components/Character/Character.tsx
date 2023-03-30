import React, { useEffect, useRef } from 'react'
import styles from './character.module.css'
type CharacterPropType={
    char:string
    state:number
    cursorLocation:boolean
}
function Character(props:CharacterPropType) {
  function getClassName(){
    if(props.state==0){
      return styles.default
    }
    if(props.state==-1){
      return styles.wrong
    }
    if(props.state==1){
      return styles.white
    }
  }
  // const className=;
  return (
    <>
    <span className={`${styles.character} ${props.cursorLocation && styles.current} ${getClassName()}`}>{props.char} </span>
    </>
  )
}

export default Character

// {props.cursorLocation!=-1 && "|"}
// {props.cursorLocation?"|":""}