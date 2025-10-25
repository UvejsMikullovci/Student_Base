import React from 'react'

export default function ProfileBox({src, name, email,role, button}) {
  return (
    <>
      <div className='div-profileBox'>
        <image src={src}></image>
        <h3>{name}</h3>
        <h4>{email}</h4>
        <h4 className='h4-Role'>{role}</h4>
        <button>{button}</button>
      </div>
    </>
  )
}
