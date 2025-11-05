import React from "react";
import "../../styles/panelCollage.css";

const PostCard = ({ date, title, description, image }) => {
  return (
    <div className="post-card">
      <img src={image} alt={title} className="post-img" />
      <div className="post-content">
        <p className="post-date">{date}</p>
        <h4>{title}</h4>
        <p>{description}</p>
        <button className="read-more">Read More →</button>
      </div>
    </div>
  );
};

export default PostCard;
