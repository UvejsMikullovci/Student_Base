import React from "react";
import "./ContactDetails.css";

const ContactDetails = () => {
  return (
    <section className="contact-section">
      <div className="contact-cards">
        <div className="contact-card">
          <div className="icon">📧</div>
          <h4>Email</h4>
          <p>info@studo.com</p>
        </div>

        <div className="contact-card">
          <div className="icon">📞</div>
          <h4>Telefon</h4>
          <p>+383 49 123 456</p>
        </div>

        <div className="contact-card">
          <div className="icon">📍</div>
          <h4>Adresa</h4>
          <p>Prishtinë, Kosovë</p>
        </div>

        <div className="contact-card">
          <div className="icon">⏰</div>
          <h4>Orari</h4>
          <p>E Hënë - E Premte: 9:00 - 17:00</p>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
