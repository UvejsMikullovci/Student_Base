import React from 'react'
import LittleBox from '../../../molecules/group4/profiliIm/LittleBox'
import RightSide from '../../../organisms/panelProfProfile/RightSide'
import LeftSide from '../../../organisms/panelProfProfile/LeftSide'
import "../panelProfProfile/PanelProfProfile.css"

export default function Profile() {
  return (
    <>
    <div className='div-panelProfile'>
    <div className='div-headerPart'>
    <div className='div-Heading'>
    <h1>Profili Im</h1>
    <p>Menaxho informacionin personal dhe dokumentet</p>
    </div>
    <br></br>
    <div className='div-littleBoxi'>
        <div className='div-littleBoxContent'>
            <div className='div-littleBoxComponent'>
            <LittleBox
            subTitle="Plotesia e profilit"
            text="Plotëso profilin për aplikime më të suksesshme"
            ></LittleBox>
            </div>
            <div className='div-littleBoxPercentage'>
                <h2>75%</h2>
            </div>
        </div>
    
        <hr id="hrLine-littleBox"></hr>
    </div>
    </div>
  
    <div className='div-panelContent'>
        <div className='div-leftSide'>
        <LeftSide></LeftSide>
        </div>
        <div className='div-rightSide'>
        <RightSide></RightSide>
        </div>
        </div>     
          </div>
    </>
  )
}
