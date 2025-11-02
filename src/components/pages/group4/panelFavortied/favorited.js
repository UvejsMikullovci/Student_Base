import React from 'react'
import './favorited.css'

function favorited() {
  return (
    <>
            <h1 className="notif-heading-main">Të Preferuarat</h1>
        <p className="notif-paragraph-main">Ketu mund ti shihni kolegjet qe i preferoni</p>
    <div className="favorited-container">
      <h1 className="card-head"><i className="fa-regular fa-heart" style={{ fontSize: "24px", color: "#DF4C4A",marginRight:"15px",marginTop:"15px" }}></i>Të preferuarat</h1>
        <p className="card-paragraph" style={{marginBottom:"20px"}}>Nuk u gjet asnjë kolegj!</p>
    </div>
    </>
  )
}

export default favorited