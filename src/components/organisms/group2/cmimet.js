import React from "react";
import "./cmimet.css";
import { faCheckCircle, faTimesCircle } from "@fortawesome/fontawesome-free";

const plans = [
  {
    name: "Falas",
    price: "€0",
    period: "/muaj",
    description: "Për studentë që po fillojnë kërkimin e tyre",
    features: [
      "Shfleto të gjitha kolegjet",
      "Shiko informacion bazë",
      "Apliko në deri 3 kolegje",
      "Mbështetje email bazë",
    ],
    missing: [
      "Statistika të avancuara",
      "Konsulencë personale",
      "Prioritet në aplikime",
      "Webinare ekskluzive",
    ],
    buttonText: "Fillo falas",
    highlight: false,
  },
  {
    name: "Premium",
    price: "€9.99",
    period: "/muaj",
    description: "Për studentë seriozë që duan më shumë",
    features: [
      "Të gjitha veçoritë Falas",
      "Aplikime të pakufizuara",
      "Statistika të avancuara",
      "Krahasim i detajuar",
      "Mbështetje prioritare",
      "Njoftime të hershme",
    ],
    missing: ["Konsulencë personale (1 sesion)", "Webinare ekskluzive"],
    buttonText: "Zgjidh Premium",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "€29.99",
    period: "/muaj",
    description: "Për kolegje dhe institucione arsimore",
    features: [
      "Të gjitha veçoritë Premium",
      "Profil i verifikuar i kolegjit",
      "Menaxhim i aplikimeve",
      "Analiza dhe raporte",
      "API Access",
      "Branding i personalizuar",
      "Account Manager dedikuar",
      "Trajnime për stafin",
    ],
    missing: [],
    buttonText: "Zgjidh Enterprise",
    highlight: false,
  },
];

export default function PricingPlans() {
  return (
    <section className="pricing-section">
      <div className="pricing-header">
        <h1>Planet për çdo <span>nevojë</span></h1>
        <p>
          Zgjidhni planin që përshtatet me ju — filloni falas dhe rrituni kur të jeni gati.
        </p>
      </div>

      <div className="pricing-container">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`plan-card ${plan.highlight ? "highlight" : ""}`}
          >
            {plan.highlight && <div className="badge">Më i përzgjedhuri</div>}

            <h2 className="plan-title">{plan.name}</h2>
            <p className="description">{plan.description}</p>

            <h1 className="price">
              {plan.price}
              <span>{plan.period}</span>
            </h1>

            <ul className="features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <i className="faCheckCircle"></i>
                  {feature}
                </li>
              ))}
              {plan.missing.map((missing, idx) => (
                <li key={idx} className="missing">
                  <i className="faTimesCircle"></i>
                  {missing}
                </li>
              ))}
            </ul>

            <button className="plan-btn">{plan.buttonText}</button>
          </div>
        ))}
      </div>
    </section>
  );
}