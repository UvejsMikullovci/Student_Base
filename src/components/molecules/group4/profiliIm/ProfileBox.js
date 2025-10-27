import React from 'react'
import "./ProfileBox.css"

export default function ProfileBox({ name, email,role, button}) {
  return (
    <>
      <div className='div-profileBox'>      
        <h1>EV</h1>  
        <h3>{name}</h3>
        <h4>{email}</h4>
        <h4 className='h4-Role'>{role}</h4>
        <button>{button}</button>
      </div>
    </>
  )
}
