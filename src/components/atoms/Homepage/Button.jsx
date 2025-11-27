import React from 'react';
import "./Button.css";

export default function Button({label, type = "primary"}) {
  return <button className={type} id="homePageButton">{label}</button>;
}
