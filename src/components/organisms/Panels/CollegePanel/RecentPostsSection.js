import React from "react";
import PostCard from "../../../molecules/Panels/CollegePanel/PostCard";

const RecentPostsSection = () => {
  const posts = [
    {
      date: "11/1/2025",
      title: "New Research Facility Opening",
      description:
        "We are excited to announce the opening of our state-of-the-art research facility.",
      image:
        "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    },
    {
      date: "10/28/2025",
      title: "Celebrating 50 Years of Excellence",
      description:
        "Join us in celebrating five decades of academic achievement and innovation.",
      image:
        "https://images.unsplash.com/photo-1571260899304-425eee4c7efc",
    },
  ];

  return (
    <section className="recent-posts">
      <div className="section-header">
        <h3>Recent Posts</h3>
        <button className="see-more">See more →</button>
      </div>
      <div className="posts-grid">
        {posts.map((p, i) => (
          <PostCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
};

export default RecentPostsSection;
