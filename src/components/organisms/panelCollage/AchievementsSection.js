import React from "react";
import AchievementCard from "../../molecules/panelCollage/AchievementCard";

const AchievementsSection = () => {
  const achievements = [
    {
      title: "Top 100 Universities",
      subtitle: "Ranked in the top 100 universities worldwide",
    },
    {
      title: "95% Employment Rate",
      subtitle: "Within 6 months of graduation",
    },
    {
      title: "50+ Research Labs",
      subtitle: "State-of-the-art research facilities",
    },
    {
      title: "10,000+ Students",
      subtitle: "From over 80 countries",
    },
  ];

  return (
    <section className="achievements">
      <h3>College Achievements</h3>
      <div className="achievements-grid">
        {achievements.map((a, i) => (
          <AchievementCard key={i} {...a} />
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;
