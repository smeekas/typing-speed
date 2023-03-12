import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import Word from '../Word/Word';
import styles from './TypingArea.module.css'
import Character from '../Character/Character';
import Space from '../Space/Space';
function generateWords(){
    const arr=[];
    for(let i=0;i<12;i++){
        arr.push(faker.word.noun())
    }
    return arr;
}
const dummWords=generateWords()
function TypingArea() {
    // const [words,setWords]=useState(generateWords());
    // const [charState,setCharState]=useState(generateCharState());
    // const [active,setActive]=useState(0);
    // const [charIndex,setCharIndex]=useState(0);/
    const [activeWord,setActiveWord]=useState({
        words:dummWords,
        wordIndex:0,
        word:dummWords[0],
        index:0,
        charState:generateCharState()
    });
    // function generateState(len:number){
    //     const stateArr=[]
    //         for(let i=0;i<len;i++){
    //             stateArr.push(0);
    //         }
    //         return stateArr
    // }
    function generateCharState(){
        const arr:number[][]=[];
        // console.log(words)       
        for(let i=0;i<dummWords .length;i++){
            // console.log(words[i])
            // console.log(words[i].length)
            // console.log(Array(words[i].length).fill(0,0,words[i].length))
            arr.push(Array(dummWords[i].length).fill(0,0,dummWords[i].length))
        }
        return arr;
    }
    // console.log(words)
    // console.log(charState[activeWord.wordIndex])
    // console.log(activeWord.word.charAt(charIndex))

    // console.log(activeWord.index)
   
useEffect(()=>{
  const listener=  (event:KeyboardEvent)=>{
    if(event.key=="Alt" || event.key=='Control'){
        // console.log("HERe")
        return
    }  
    //  console.log(activeWord.index)
        // console.log(activeWord.word.charAt(activeWord.index))
        // console.log(event.key);
        if(event.key==="Backspace"){
            if(activeWord.index>0){
                setActiveWord((prev)=>{
                    const newCharState={...prev.charState};
                    newCharState[prev.wordIndex] =newCharState[prev.wordIndex].map((cs,index)=>index===prev.index-1?0:cs)
                    return {...prev,index:prev.index-1,charState:newCharState}
                })
                
            }else{
                setActiveWord(prev=>{
                    const newState={...prev};
                    if(newState.wordIndex===0){
                        return prev;
                    }
                    if(
                    newState.charState[newState.wordIndex-1].includes(-1)){
                        newState.wordIndex--;
                        newState.word=newState.words[newState.wordIndex];
                        newState.index=newState.word.length-1;
                        newState.charState[newState.wordIndex][newState.index]=0;
                    }
                    return newState
                })
            }
            return
        }
    if(event.key===" "){
        setActiveWord((prevState)=>{
            const newState={...prevState};
            if(newState.index<newState.word.length){
                for(let i=newState.index;i<newState.word.length;i++){
                    newState.charState[newState.wordIndex][i]=-1

                }
            }
            newState.wordIndex++;
            newState.index=0;
            newState.word=dummWords[newState.wordIndex]
            return newState
        })
        return
    }
        if(event.key===activeWord.word.charAt(activeWord.index)){

console.log("letter matched");
// console.log(activeWord.word.length===activeWord.index+1)
            // if(activeWord.word.length!==activeWord.index+1){
                // console.log("IFF");
            setActiveWord((prevState)=>{
                const newState={...prevState};
                newState.charState[newState.wordIndex]=newState.charState[newState.wordIndex].map((cs,index)=>index===prevState.index?1:cs)
                // console.log(newState.charState[newState.wordIndex])
                newState.index=newState.index+1;
                return newState
            
            })
            
        }else{
            // console.log("ELSEE")
            setActiveWord((prevState)=>{
                const newState={...prevState};
                newState.charState[newState.wordIndex]=newState.charState[newState.wordIndex].map((cs,index)=>index===prevState.index?-1:cs)
                newState.index=newState.index+1;
                return newState
            })
        }
    
    
}
    document.addEventListener('keydown',listener)
    return ()=>{
        document.removeEventListener('keydown',listener)
    }
},[activeWord])
console.log(activeWord.word.length,activeWord.index);
  return (
    <div className={styles.typingArea}>
        {activeWord.words.map((word,index)=>{
            return <   >
            <Word active={index===activeWord.index} hasCursor={index===activeWord.wordIndex} cursor={activeWord.index}  charState={activeWord.charState[index]} activeWord={activeWord} word={word}/>
            <Space hasCursor={ index===activeWord.wordIndex  && activeWord.index===activeWord.word.length}/>
             </>
        })}
    </div>
  )
}

export default TypingArea
// activeWord.index===activeWord.word.length-1
// hasCursor={index===activeWord.wordIndex} cursor={activeWord.index}