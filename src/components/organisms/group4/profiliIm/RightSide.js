import React from 'react'
import Profile from '../../../molecules/group4/profiliIm/ProfileBox'
import FastStatistics from '../../../molecules/group4/profiliIm/FastStatistics'
import './RightSide.css'

export default function RightSide() {
  return (
    <>
    <div className='RightSide'>
      <div className='div-profileBoxi'>
        <Profile
        src=""
        name="Erion Veliaj"
        email="erionveliaj@gmail.com"
        role="Student"
        button="Ndrysho Foton"
        ></Profile>
      </div>
      <div className='div-profileFastStatistics'>
        <FastStatistics
        title="Statistika te shpejta"
        headingOne="Aplikime totale"
        headingTwo="Te pranuara"
        headingThree="Ne pritje"
        headingFour="Dokumente"
        ></FastStatistics>
      </div>
    </div>

    </>
  )
}
