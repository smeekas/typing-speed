import React from 'react'
import styles from './space.module.css'
type SpacePropType={
    hasCursor:boolean
}
function Space(props:SpacePropType) {
  return (
    <span className={props.hasCursor ? styles.space:""} >&nbsp;&nbsp;&nbsp;</span>
  )
}

export default Space