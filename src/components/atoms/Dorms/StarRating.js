import React from "react";
import "./StarRating.css"

export default function StarRating({ rating }) {
  const stars = Array(5).fill(0).map((_, i) => (
    <span key={i}>{i < rating ? "★" : "☆"}</span>
  ));
  return <div>{stars}</div>;
}
