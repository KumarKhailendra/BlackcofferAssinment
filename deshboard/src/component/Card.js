import React from 'react'

const Card = ({value, text}) => {
  return (
    <div style={{"width": "130px", "padding":"28px", "border":"1px solid #ccc", color:"#fff"}}>
        <div style={{display:"flex", width: "100%", height:"100%", "flexDirection":"column", "alignContent": "flex-end", "alignItems": "center", "flexWrap": "nowrap","justifyContent":"center", "justifyItems":"center"}}>
            <div style={{fontSize:"40px"}}>{value}</div>
            <div style={{"fontSize":"24"}}>{text}</div>
        </div>
    </div>
  )
}

export default Card