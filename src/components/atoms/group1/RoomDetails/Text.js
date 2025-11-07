import React from "react";
import "./Text.css"

export default function Text({ content, type = "p" }) {
  const Tag = type;
  return <Tag>{content}</Tag>;
}
