import React from 'react';
import "./Button.css";

export function Button({label, type = "primary"}) {
  return <button className={type} id="button">{label}</button>;
}
