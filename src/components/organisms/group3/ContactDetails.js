import React from "react";
import ContactInfoCard from "../../molecules/group3/ContactInfoCard";

const ContactDetails = () => (
  <div className="contact-details">
    <ContactInfoCard icon="📧" title="Email" text="info@eshkolla.com" />
    <ContactInfoCard icon="📞" title="Telefon" text="+383 49 123 456" />
    <ContactInfoCard icon="📍" title="Adresa" text="Prishtinë, Kosovë" />
    <ContactInfoCard icon="⏰" title="Orari" text="E hënë – E premte: 9:00 – 17:00" />
  </div>
);

export default ContactDetails;
