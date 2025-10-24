import React from "react";
import Cmimet from "../../organisms/group2/cmimet";
import "./cmimet.css";


export default function RrethNeshPage() {
  return (
    <main>
      <Cmimet />
       <div className="pricing-page">
      <section className="faq-section">
        <h2>Pyetje të shpeshta rreth çmimeve</h2>

        <div className="faq-item">
          <h4>A mund të ndryroj planin më vonë?</h4>
          <p>
            Po! Mund ta ndryroni planin tuaj në çdo kohë. Nëse përmirësoni, do të
            paguani vetëm diferencën e proratur. Nëse ulni, ndryshimet do të hyjnë
            në fuqi në ciklin tuaj të ardhshëm të faturimit.
          </p>
        </div>

        <div className="faq-item">
          <h4>A ka kontratë afatgjatë?</h4>
          <p>
            Jo! Të gjitha planet tona janë mujore dhe pa kontratë. Mund ta anuloni
            abonimin tuaj në çdo kohë pa tarifa anulimi.
          </p>
        </div>

        <div className="faq-item">
          <h4>Çfarë mënyrash pagese pranoni?</h4>
          <p>
            Pranojmë të gjitha kartat kryesore të kreditit dhe debitit (Visa,
            Mastercard, American Express), si dhe transferta bankare për planet
            Enterprise.
          </p>
        </div>

        <div className="faq-item">
          <h4>A ka ulje për studentë?</h4>
          <p>
            Po! Studentët që mund të verifikojnë statusin e tyre akademik marrin
            20% ulje në planin Premium. Kontaktoni mbështetjen për detaje.
          </p>
        </div>
      </section>

      {/* Red CTA Footer Section */}
      <section className="cta-section">
        <p className="cta-subtitle">Gati për të filluar?</p>
        <h3>
          Bashkohuni me mijëra studentë që po përdorin Studo për të gjetur
          kolegjet e tyre ideale.
        </h3>
        <button className="cta-btn">Filloni sot</button>
      </section>
    </div>
    </main>
  );
}