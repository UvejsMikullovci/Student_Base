import React from 'react'

export default function SharedRoom({ title, text, subletitle, image }) {
  return (
    <div className='SharedRoom'>
      <div className='container'>
        <div className='image'>
          {image && <img src={image} alt="" />}
        </div>
        <h2>{title}</h2>
        {subletitle && <h4>{subletitle}</h4>}
        <p>{text}</p>
      </div>
    </div>
  )
}
