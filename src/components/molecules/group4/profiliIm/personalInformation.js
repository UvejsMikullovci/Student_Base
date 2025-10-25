import React, { useState } from 'react';
import './PersonalInformation.css';

function PersonalInformation() {
  // Actual saved info
  const [info, setInfo] = useState({
    name: "Maja",
    surname: "Llosha",
    email: "maja@example.com",
    phone: "+355 68 123 4567",
    birthday: "2002-05-21",
    city: "Tirana",
    address: "Rruga e Dibrës, 123"
  });

  // Temporary editable info
  const [tempInfo, setTempInfo] = useState({ ...info });

  // Handle field typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempInfo({ ...tempInfo, [name]: value });
  };

  // Save button
  const handleSave = () => {
    setInfo({ ...tempInfo });
  };

  // Optional: Reset (Cancel) button
  const handleCancel = () => {
    setTempInfo({ ...info });
  };

  return (
    <div className="personal-info-container">
      <h2>Personal Information</h2>

      <div className="input-fields">
        <input
          type="text"
          name="name"
          value={tempInfo.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="surname"
          value={tempInfo.surname}
          onChange={handleChange}
          placeholder="Surname"
        />
        <input
          type="email"
          name="email"
          value={tempInfo.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="tel"
          name="phone"
          value={tempInfo.phone}
          onChange={handleChange}
          placeholder="Phone number"
        />
        <input
          type="date"
          name="birthday"
          value={tempInfo.birthday}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          value={tempInfo.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="address"
          value={tempInfo.address}
          onChange={handleChange}
          placeholder="Address"
        />
      </div>

      <div className="buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default PersonalInformation;
