import React, {useState}from 'react'



export default function LittleBox({title, subTitle, text, hrWidth}) {
  return (
    <>
    <div className='div-littleBox'>
    <h1>{title}</h1>
    <h3>{subTitle}</h3>
    <p>{text}</p>
    </div>   
    </>
  )
}
