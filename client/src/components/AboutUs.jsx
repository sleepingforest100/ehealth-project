import React from "react";
import image from "../images/aboutimg.jpg";

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="hero-img">
            <img
              src={image}
              alt="hero"
            />
          </div>
          <div className="hero-content">
          <p>
    Welcome to <strong>Kazakhstan E-Health</strong> – a revolutionary platform designed to transform healthcare access across Kazakhstan. We are committed to providing innovative digital solutions that cater to both remote and urban communities.
</p>

<p>
    Our platform features an <strong>AI Doctor</strong>, powered by <em>AMIE by Google</em>, ensuring fast, reliable, and accurate medical consultations at your fingertips. Whether you need advice or a diagnosis, our AI Doctor is here to help.
</p>

<p>
    With <strong>video consultations</strong> from certified healthcare professionals, accessing medical expertise is now easier than ever, no matter where you are. Additionally, our platform offers a simple and intuitive way to <strong>book appointments</strong>
</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
