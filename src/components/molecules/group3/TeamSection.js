import React from "react";
import TeamCard from "../../atoms/group3/TeamCard";

export default function TeamSection() {
  const team = [
    {
      name: "Erion Visha",
      position: "CEO & Themelues",
      image: "https://images.unsplash.com/photo-1603415526960-f7e0328b8d7c",
    },
    {
      name: "Andi Koci",
      position: "CTO",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3b",
    },
    {
      name: "Sara Hoxha",
      position: "Drejtuese Marketingu",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
    },
    {
      name: "Albion Mehmeti",
      position: "Menaxher i Projekteve",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {team.map((member, index) => (
        <TeamCard
          key={index}
          name={member.name}
          position={member.position}
          image={member.image}
        />
      ))}
    </div>
  );
}
