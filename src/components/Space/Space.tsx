import React from 'react'
import styles from './space.module.css'
type SpacePropType={
    hasCursor:boolean
}
function Space(props:SpacePropType) {
  return (
    <span className={ ` ${styles.default} ${props.hasCursor ? styles.space:""}`} ></span>
  )
}

export default Space

//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;