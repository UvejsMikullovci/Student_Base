import React, { useState } from "react";
import Cmimet from "../../organisms/Pricing/cmimet";
import "./Pricing.css";

const faqs = [
  {
    q: "A mund të ndryshoj planin më vonë?",
    a: "Po! Mund ta ndryshoni planin tuaj në çdo kohë. Nëse përmirësoni, paguani vetëm diferencën e proratur. Nëse ulni, ndryshimet hyjnë në fuqi në ciklin tuaj të ardhshëm të faturimit.",
  },
  {
    q: "A ka kontratë afatgjatë?",
    a: "Jo! Të gjitha planet tona janë mujore dhe pa kontratë. Mund ta anuloni abonimin tuaj në çdo kohë pa tarifa anulimi.",
  },
  {
    q: "Çfarë mënyrash pagese pranoni?",
    a: "Pranojmë të gjitha kartat kryesore të kreditit dhe debitit (Visa, Mastercard, American Express), si dhe transferta bankare për planet Enterprise.",
  },
  {
    q: "A ka ulje për studentë?",
    a: "Po! Studentët që verifikojnë statusin e tyre akademik marrin 20% ulje në planin Premium. Kontaktoni mbështetjen për detaje.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <>
      <Cmimet />
      <section className="faq-modern">
        <div className="faq-header">
          <h2>Pyetje të shpeshta</h2>
          <p>Gjithçka që duhet të dini për planet dhe abonimet.</p>
        </div>

        <div className="faq-container">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq-card ${open === i ? "open" : ""}`}
              onClick={() => toggle(i)}
            >
              <div className="faq-question">
                <h4>{item.q}</h4>
                <span className="faq-arrow">
                  <i className={`fa-solid ${open === i ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                </span>
              </div>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <h3>Bashkohuni me komunitetin e studentëve në <span>Studo</span></h3>
          <p>Ndihmuar qindra studentë të gjejnë kolegjin ideal çdo muaj.</p>
          <button className="cta-btn">Filloni sot</button>
        </div>
      </section>
    </>
  );
}