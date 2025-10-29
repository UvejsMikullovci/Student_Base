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
        <h3>5</h3>
        <h3>2</h3>
        <h3>3</h3>
        <h3>4/5</h3>
        </div>
      </div>
    </div>
    </>

  )
}
