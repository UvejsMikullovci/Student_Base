import React, { useState } from "react";
import "./FAQAccordion.css";

const Item = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="arrow">{open ? "−" : "+"}</span>
      </button>
      <div className="faq-a">{a}</div>
    </div>
  );
};

export default function FAQAccordion() {
  return (
    <div className="faq-wrap">
      <h3 className="faq-title">Pyetje të shpeshta</h3>
      <Item q="Si mund të aplikoj në një kolegj?" a="Regjistrohu në platformë, shfleto kolegjet dhe kliko 'Apliko' në kolegjet që të interesojnë." />
      <Item q="A është falas platforma?" a="Po! Përdorimi bazë i platformës është kompletisht falas për studentët." />
      <Item q="Sa kohë merr procesi i aplikimit?" a="Zakonisht, do të marrësh përgjigje brenda 2-4 javësh nga data e aplikimit." />
      <div className="faq-cta">
        <p>Kërkoni përgjigje për pyetje të tjera?</p>
        <button className="faq-btn">Shiko të gjitha pyetjet</button>
      </div>
    </div>
  );
}
