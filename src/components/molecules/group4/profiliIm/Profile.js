import React from 'react'

export default function Profile({src, name, email,icon, button}) {
  return (
    <>
      <div className='div-profileBox'>
        <image src={src}></image>
        <h3>{name}</h3>
        <h4>{email}</h4>
        <button>{button}</button>
      </div>
    </>
  )
}
