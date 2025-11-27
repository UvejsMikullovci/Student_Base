import React from "react";

function Button({ text, onClick }) {
  return React.createElement(
    "button",
    { className: "college-btn", onClick },
    text
  );
}

export default Button;
