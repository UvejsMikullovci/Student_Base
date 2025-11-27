import React from "react";
import "./PanelLandlordProfile.css";
import ProfileImg from '../../../../../media/profilee.jpeg'

export default function PanelLandlordProfile() {
  return (
    <div className="page">

      <div className="card">
        <div className="card-header">
          <button className="edit-btn">Edit Profile</button>
        </div>

        <div className="profile-box">
          <img
            src={ProfileImg}
            alt="Profile"
            className="profile-img"
          />

          <div>
            <h3 className="profile-name">Robert Anderson</h3>
            <p className="profile-role">Property Owner</p>
          </div>
        </div>

        <form className="form-grid">
          <div className="input-group">
            <label>Full Name</label>
            <input value="Robert Anderson" readOnly />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input value="robert.anderson@email.com" readOnly />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input value="+1 (555) 444-5555" readOnly />
          </div>

          <div className="input-group">
            <label>Address</label>
            <input value="789 Property Lane, Metro City" readOnly />
          </div>

          <div className="input-group full">
            <label>About</label>
            <textarea
              readOnly
              value="Experienced landlord specializing in student housing near Metropolitan University. Committed to providing safe, comfortable, and affordable living spaces for students."
            />
          </div>
        </form>
      </div>
    </div>
  );
}
