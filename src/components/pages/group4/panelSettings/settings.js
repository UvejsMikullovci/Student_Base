import React from 'react';
import './settings.css';
import ToggleSwitch from '../../../atoms/group4/toggleSwitch';
import Dropdown from '../../../atoms/group4/dropdownSelection';

function settings() {

   const languageOptions = [
    { label: "Shqip", value: "al" },
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
  ];

  const timeZoneOptions = [
    { label: "Central European Time (CET)", value: "CET" },
    { label: "Eastern European Time (EET)", value: "EET" },
  ];
  

  const handleLanguageChange = (value) => {
    console.log("Selected language:", value);
  };

  const handleTimeZoneChange = (value) => {
    console.log("Selected time zone:", value);
  };

  return (
    <div className="settings-container">
      <h1 className="card-head"><i className="fa-solid fa-gear" style={{ fontSize: "24px", color: "#f54242",marginRight:"15px" }}></i>Cilesimet</h1>
      <p className="card-paragraph">Menaxho profilin dhe preferencat tua</p>
      <div className="personal-information">
        <h1 className="card-head"><i className="fa-regular fa-user" style={{ fontSize: "24px", color: "#f54242",marginRight:"15px",marginTop:"15px" }}></i>Informacioni Personal</h1>
        <p className="card-paragraph" style={{marginBottom:"20px"}}>Përditëso informacionin tënd personal</p>
        <div className="inputs-container">
          <div className="name-inputs">
          <div className="input-group">
            <label className="input-label" htmlFor="first-name">Emri</label>
            <input className="input-field" type="text" id="first-name" placeholder="Ardi" />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="last-name">Mbiemri</label>
            <input className="input-field" type="text" id="last-name" placeholder="Hoxha" />
          </div>
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input className="input-field" type="email" id="email" placeholder="ardi@example.com" />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="phone">Telefoni</label>
            <input className="input-field" type="tel" id="phone" placeholder="+383 44 123 456" />
          </div>
          <button className="save-button">Ruaj Ndryshimet</button>
        </div>
      </div>

    <div className="safety-information">
        <h1 className="card-head"><i className="fa-solid fa-lock" style={{ fontSize: "24px", color: "#f54242",marginRight:"15px",marginTop:"15px" }}></i>Siguria</h1>
        <p className="card-paragraph" style={{marginBottom:"20px"}}>Ndrysho fjalëkalimin tënd</p>
        <div className="inputs-container">
          <div className="input-group">
            <label className="input-label" htmlFor="password">Fjalekalimi aktual</label>
            <input className="input-field" type="password" id="password" placeholder="" />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="new-password">Fjalekalimi i ri</label>
            <input className="input-field" type="password" id="new-password" placeholder="" />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="confirmed-password">Konfirmo fjalekalimin e ri</label>
            <input className="input-field" type="password" id="confirmed-password" placeholder="" />
          </div>
          <button className="save-button">Ndrysho Fjalekalimin</button>
        </div>
      </div>

      <div className="notification-container">
        <h1 className="card-head"><i className="fa-solid fa-bell" style={{ fontSize: "24px", color: "#f54242",marginRight:"15px",marginTop:"15px" }}></i>Njoftimet</h1>
        <p className="card-paragraph" style={{marginBottom:"20px"}}>Menaxho preferencat e njoftimeve</p>
        <div className="notification-settings">
          <div className="notification-item">
            <div className="notification-text">
            <span>Email Njoftime</span>
            <p>Merr njoftime për aplikime dhe mesazhe të reja</p>
            </div>
            <div className="toggle-switch">
            <ToggleSwitch />
            </div>
            </div>
            <div className="notification-item">
              <div className="notification-text">
            <span>Push Njoftime</span>
            <p>Merr njoftime në pajisjen tënde</p>
            </div>
            <div className="toggle-switch">
            <ToggleSwitch />
            </div>
            </div>
            <div className="notification-item" style={{borderBottom:"none",}}>
              <div className="notification-text">
            <span>Marketing emails</span>
            <p>Merr lajme dhe oferta speciale</p>
            </div>
            <div className="toggle-switch">
            <ToggleSwitch />
            </div>
            </div>
        </div>
        
      </div>


      <div className="language-container">
        <h1 className="card-head"><i className="fa-solid fa-globe" style={{ fontSize: "24px", color: "#f54242",marginRight:"15px",marginTop:"15px" }}></i>Gjuha dhe rajoni</h1>
        <p className="card-paragraph" style={{marginBottom:"20px"}}>Menaxho preferencat e njoftimeve</p>

        <Dropdown
        label="Gjuha"
        options={languageOptions}
        onChange={handleLanguageChange}
      />
      <Dropdown
        label="Time Zone"
        options={timeZoneOptions}
        onChange={handleTimeZoneChange}
      />
        
      </div>

      <div className="payment-container">
        <h1 className="card-head"><i className="fa-solid fa-credit-card" style={{ fontSize: "24px", color: "#f54242",marginRight:"15px",marginTop:"15px" }}></i>Metodat e pageses</h1>
        <p className="card-paragraph" style={{marginBottom:"20px"}}>Menaxho metodat e pagesës</p>
        <div className='payment-methods'>
          <i className="fa-solid fa-credit-card" style={{ fontSize: "48px", color: "#f54242", marginRight:"20px",backgroundColor:"#ffd6d6ff",padding:"10px",borderRadius:"20px" }}></ i>
          <p style={{marginBottom:"20px"}}>Nuk ke shtuar asnje metode pagese ende</p>
          <button className="payment-button">Shto metode pagese</button>
          </div>
          
        
      </div>

      <div className="notification-container">

          <div className="notification-item" style={{marginTop:"15px",border:"none"}}>
            <div className="notification-text">
            <span style={{color:"red"}}>Zona e rrezikshme</span>
            <p>Merr njoftime për aplikime dhe mesazhe të reja</p>
            </div>
            </div>

            <div className="notification-item" style={{border:"none"}}>
              <div className="notification-text">
            <span>Push Njoftime</span>
            <p>Merr njoftime në pajisjen tënde</p>
            </div>
            <button className="delete-account-button">Fshij Llogarine</button>
            </div>
        
      </div>

    </div>
  )
}

export default settings