import React from "react";
import TeamCard from "../../atoms/AboutUsAndContact/TeamCard.js";
import "./TeamSection.css";

export default function TeamSection() {
  const team = [
    {
      name: "Erion Visha",
      position: "CEO & Themelues",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
    },
    {
      name: "Andi Koci",
      position: "CTO",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
    },
    {
      name: "Sara Hoxha",
      position: "Drejtuese Marketingu",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
    },
    {
      name: "Albion Mehmeti",
      position: "Menaxher i Projekteve",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
    },
  ];

  return (
    <section className="team-section">
      <h2 className="team-title">Ekipi ynë</h2>
      <p className="team-subtitle">
        Takoni njerëzit që po punojnë për të transformuar arsimin e lartë në Kosovë
      </p>
      <div className="team-grid">
        {team.map((member, index) => (
          <TeamCard
            key={index}
            name={member.name}
            position={member.position}
            image={member.image}
          />
        ))}
      </div>
    </section>
  );
}
