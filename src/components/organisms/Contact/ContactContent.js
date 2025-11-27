import React from "react";
import Heading from "../../atoms/AboutUsAndContact/Heading";
import Paragraph from "../../atoms/AboutUsAndContact/Paragraph";
import ContactDetails from "../../molecules/Contact/ContactDetails";
import ContactForm from "../../molecules/Contact/ContactForm";
import FAQAccordion from "../../molecules/Contact/FAQAccordion";
import { motion } from "framer-motion";
import "./ContactContent.css";

export default function ContactContent() {
  return (
    <div className="contact-page">
      <motion.div className="contact-hero" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <Heading text="Na Kontaktoni" className="white" />
          <Paragraph text="Kemi pyetje? Jemi këtu për t'ju ndihmuar. Dërgoni një mesazh dhe do t'ju përgjigjemi sa më shpejt të jetë e mundur." className="hero-sub" />
        </div>
      </motion.div>

      <div className="main-wrap">
        <div className="left-col">
          <ContactForm />
        </div>

        <aside className="right-col">
          <FAQAccordion />
          <ContactDetails />
        </aside>
      </div>
    </div>
  );
}
