import React from "react";
import image from "../images/heroimg.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
        Bridging Healthcare <br />
        Across Kazakhstan
        </h1>
        <p>
        Kazakhstan E-Health is a digital healthcare platform designed to connect people in remote and rural regions of Kazakhstan with qualified medical professionals.
We make access to healthcare easier, faster, and more inclusive — wherever you are.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
