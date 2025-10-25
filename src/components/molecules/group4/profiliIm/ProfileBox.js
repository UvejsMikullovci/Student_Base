import React from 'react'
import "./ProfileBox.css"

export default function ProfileBox({src, name, email,role, button, title, text, number}) {
  return (
    <>
      <div className='div-profileBox'>
        <image src={src}></image>
        
        <h3>{name}</h3>
        <h4>{email}</h4>
        <h4 className='h4-Role'>{role}</h4>
        <button>{button}</button>
      </div>

      <div className='div-fastStatistics'>
        <div className='div-profileBoxTitle'>
        <h1>{title}</h1>
        </div>
         <div className='div-stats'>
        <div className='div-profileBoxText'>
          <h3>{text}</h3>
        </div>
        <div className='div-profileBoxNumber'>
          <h3>{number}</h3>
        </div>
      </div>
      </div>
    </>
  )
}
