import React from 'react'
import Profile from '../../../molecules/group4/profiliIm/ProfileBox'
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
        <Profile
          title="sda"
          text="sadwa"
          number="wadsad"
        ></Profile>
      </div>
    </div>

    </>
  )
}
