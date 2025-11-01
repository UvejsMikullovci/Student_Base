import React from 'react'
import "./FastStatistics.css"

export default function FastStatistics({title, headingOne, headingTwo, headingThree,headingFour}) {
  return (
    <>
      <div className='div-fastStatistics'>
      <div className='div-profileBoxTitle'>
      <h3>{title}</h3>
       </div>
        <div className='div-stats'>
        <div className='div-profileBoxText'>
          <br></br>
        <h4>{headingOne}</h4>
         <h4>{headingTwo}</h4>
          <h4>{headingThree}</h4>
           <h4>{headingFour}</h4>
        </div>
        <div className='div-profileBoxNumber'>
          <br></br>
        <p>5</p>
        <p>2</p>
        <p>3</p>
        <p>4/5</p>
        </div>
      </div>
    </div>
    </>

  )
}
