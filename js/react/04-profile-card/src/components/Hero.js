import React from "react";
import hero from "../images/hero.png";
import mail from "../images/mail.png";

export default function Hero() {
  return (
    <section className="hero">
      <img src={hero} className="hero--image" />
      <h1 className="hero--name">Laura Smith</h1>
      <h3 className="hero--job">Frontend Developer</h3>
      <p className="hero--website">laurasmith.website</p>
      <button className="hero--email">
        <img src={mail} className="hero--email-logo" />
        <span className="hero--email-text">Email</span>
      </button>
    </section>
  );
}
