import React from "react";
import "./Avatar.js"

export default function Avatar({ image, alt }) {
  return <img src={image} alt={alt} width="50" height="50" />;
}
