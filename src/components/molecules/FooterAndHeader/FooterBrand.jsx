import React from "react";
import IconButton from "../../atoms/FooterAndHeader/IconButton";
import logoImg from "../../../media/logo.png";
import facebook from "../../../media/facebook.svg";
import instagram from "../../../media/instagram.svg";
import twitter from "../../../media/twitter.svg";
import linkedin from "../../../media/linkedin.svg";


const FooterBrand = () => {
  return (
    <div className="footer-brand">
      <div className="brand-header">
        <a href="/"><img width="100%" src={logoImg} alt="Studo logo" className="brand-logo" /></a>
      </div>
      <p className="brand-description">
        Platforma më e mirë për kërkimin dhe aplikimin në kolegjet e Kosovës.
      </p>

      <div className="footer-socials">
        <a href="#"><img src={facebook} alt="" /></a>
        <a href="#"><img src={instagram} alt="" /></a>
        <a href="#"><img src={twitter} alt="" /></a>
        <a href="#"><img src={linkedin} alt="" /></a>
      </div>
    </div>
  );
};

export default FooterBrand;
