import React from 'react'
import Character from '../Character/Character'
type ExtraPropsType={
    extraData:string|undefined
}
function Extra(props:ExtraPropsType) {
    // console.log(props.extraData)
    const style:React.CSSProperties= props.extraData && props.extraData.length>0?{
      letterSpacing:"-1px",
      marginLeft:"2px"
    }:{

    }
  return (
    <div style={style}>
    {
     props.extraData &&   props.extraData.split("").map((cs,index)=>{
            return <Character char={cs} key={index} cursorLocation={false} state={-1}/>
        })
    }
    </div>
  )
}

export default Extra