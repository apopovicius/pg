import React from "react";
import x from "../images/x.png";
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import linkedin from "../images/linkedin.png";
import github from "../images/github.png";

export default function Footer() {
  return (
    <footer className="footer">
      <img src={x} className="footer-image" alt="x" />
      <img src={facebook} className="footer-image" alt="facebook" />
      <img src={instagram} className="footer-image" alt="instagram" />
      <img src={linkedin} className="footer-image" alt="linkedin" />
      <img src={github} className="footer-image" alt="github" />
    </footer>
  );
}
