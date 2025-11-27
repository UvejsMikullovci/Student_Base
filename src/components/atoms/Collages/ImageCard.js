import React from "react";

function ImageCard({ src, alt }) {
  return React.createElement("img", {
    src,
    alt,
    className: "college-img"
  });
}

export default ImageCard;
