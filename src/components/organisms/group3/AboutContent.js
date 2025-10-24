import React from "react";
import Heading from "../../atoms/group3/Heading";
import Paragraph from "../../atoms/group3/Paragraph";
import StatsSection from "../../molecules/group3/StatsSection";
import MissionVisionSection from "../../molecules/group3/MissionVisionSection";
import TeamSection from "../../molecules/group3/TeamSection";
import PartnersSection from "../../molecules/group3/PartnersSection";
import { motion } from "framer-motion";
import "./AboutContent.css";

export default function AboutContent() {
  return (
    <div className="bg-[#FFF8F6] text-gray-800 pb-20 overflow-hidden">
      {/* Hero Section */}
      {/* Hero Section */}
      <motion.div
        className="about-hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <Heading text="Rreth Nesh" className="text-white" />
          <Paragraph
            text="Ne jemi të përkushtuar për të transformuar mënyrën si studentët e Kosovës zhvillojnë aftësitë dhe përgatiten për institucionet arsimore."
            className="text-gray-100"
          />
        </div>
      </motion.div>


      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <StatsSection />
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        className="max-w-6xl mx-auto px-6 mt-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Heading text="Misioni dhe Vizioni jonë" />
        <Paragraph text="Gjithçka që bëjmë është e ndërtuar nga vlerat tona themelore." />
        <MissionVisionSection />
      </motion.div>

      {/* History Section */}
      <motion.div
        className="about-history"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="history-text">
          <Heading text="Historia jonë" className="text-left" />
          <Paragraph text="Studo u themelua në vitin 2020 me një vizion të qartë: të lehtësojmë procesin e zgjedhjes dhe aplikimit në kolegje për studentët e Kosovës." />
          <Paragraph text='Ekipi ynë filloi me një pyetje të thjeshtë: "Pse duhet të jetë kaq e vështirë për studentët të gjejnë informacion të besueshëm për kolegjet?"' />
          <Paragraph text="Sot, ne jemi krenarë që shërbejmë si ura midis mijëra studentëve dhe institucioneve më të mira arsimore në Kosovë, duke i ndihmuar ata të marrin vendime të informuara për të ardhmen e tyre." />
          <Paragraph text="Me një ekip të përkushtuar dhe partneritete me mbi 50 kolegje, ne vazhdojmë të inovojmë dhe të përmirësojmë përvojën e çdo studenti në platformën tonë." />
        </div>

        <motion.img
          src="https://images.unsplash.com/photo-1573497491208-6b1acb260507"
          alt="Team working"
          className="history-img"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <TeamSection />
      </motion.div>

      {/* Partners Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <PartnersSection />
      </motion.div>
    </div>
  );
}
