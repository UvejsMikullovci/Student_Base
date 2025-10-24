import React from "react";
import { motion } from "framer-motion";
import "./KontaktiPage.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function KontaktiPage() {
  return (
    <div className="kontakti">
      {/* ===== HERO SECTION ===== */}
      <motion.section
        className="kontakti-hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="kontakti-hero-content">
          <h2>Na Kontaktoni</h2>
          <p>
            Kemi pyetje? Jemi këtu për t'ju ndihmuar. Dërgoni një mesazh dhe do
            t'ju përgjigjemi sa më shpejt të jetë e mundur.
          </p>
        </div>
      </motion.section>

      {/* ===== CONTACT INFO SECTION ===== */}
      <motion.section
        className="kontakt-info-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="kontakt-card">
          <div className="kontakt-icon">
            <FaEnvelope />
          </div>
          <h3>Email</h3>
          <p>info@studo.com</p>
        </div>

        <div className="kontakt-card">
          <div className="kontakt-icon">
            <FaPhoneAlt />
          </div>
          <h3>Telefon</h3>
          <p>+383 49 123 456</p>
        </div>

        <div className="kontakt-card">
          <div className="kontakt-icon">
            <FaMapMarkerAlt />
          </div>
          <h3>Adresa</h3>
          <p>Prishtinë, Kosovo</p>
        </div>

        <div className="kontakt-card">
          <div className="kontakt-icon">
            <FaClock />
          </div>
          <h3>Orari</h3>
          <p>E Hënë - E Premte: 9:00 - 17:00</p>
        </div>
      </motion.section>
    </div>
  );
}
