import React from "react";

function Paragraph({ text, className }) {
  return React.createElement("p", { className }, text);
}

export default Paragraph;
