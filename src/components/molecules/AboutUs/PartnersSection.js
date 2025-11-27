import React from "react";
import "./PartnerSection.css";

export default function PartnersSection() {
  const partners = [
    "Universiteti i Tiranës",
    "Universiteti Politeknik",
    "Kolegjii Europian",
    "Kolegjii Bedër",
    "Universiteti Bujqësor",
    "Akademia e Arteve",
  ];

  return (
    <section className="partners-section">
      <h2 className="partners-title">Partnerët tanë</h2>
      <p className="partners-subtitle">
        Punojmë me institucionet më të mira arsimore në vend
      </p>

      <div className="partners-grid">
        {partners.map((name, index) => (
          <div key={index} className="partner-card">
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
