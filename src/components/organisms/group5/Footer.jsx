import React from "react";
import "./Footer.css";
import FooterBrand from "../../molecules/group5/FooterBrand";
import FooterColumn from "../../molecules/group5/FooterColumn";

const Footer = () => {
  // ✅ Updated route paths
  const quickLinks = [
    { label: "Kolegjet", href: "/kolegjte" },
    { label: "Programet", href: "/programet" },
    { label: "Çmimet", href: "/cmimet" },
    { label: "FAQ", href: "/faq" },
  ];

  const companyLinks = [
    { label: "Rreth nesh", href: "/rreth-nesh" },
    { label: "Kontakti", href: "/kontakti" },
    { label: "Privatësia", href: "/privatesia" },
    { label: "Termat & Kushtet", href: "/kushtet" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <FooterBrand />

        <FooterColumn title="Lidhje të shpejta" links={quickLinks} />
        <FooterColumn title="Kompania" links={companyLinks} />

        <div className="footer-column">
          <h4>Kontakti</h4>
          <ul className="footer-contact">
            <li>
              <i className="fa-regular fa-envelope"></i> info@studo.com
            </li>
            <li>
              <i className="fa-solid fa-phone"></i> +383 49 123 456
            </li>
            <li>
              <i className="fa-solid fa-location-dot"></i> Prishtinë, Kosovo
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Studo. Të gjitha të drejtat të rezervuara.</p>
      </div>
    </footer>
  );
};

export default Footer;
