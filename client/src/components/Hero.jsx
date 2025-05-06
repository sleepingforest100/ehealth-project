import React from "react";
import image from "../images/kaz_medicine.jpg";
import "../styles/hero.css";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    title: "Bridging Healthcare\nAcross Kazakhstan",
    paragraph:
      "Kazakhstan E-Health is a digital healthcare platform designed to connect people in remote and rural regions of Kazakhstan with qualified medical professionals. We make access to healthcare easier, faster, and more inclusive — wherever you are.",
  },
  ru: {
    title: "Мост к здравоохранению\nпо всему Казахстану",
    paragraph:
      "Kazakhstan E-Health — это цифровая платформа здравоохранения, созданная для соединения людей в отдалённых и сельских районах Казахстана с квалифицированными медицинскими специалистами. Мы делаем доступ к медицине проще, быстрее и доступнее — где бы вы ни находились.",
  },
  kz: {
    title: "Қазақстанда\nденсаулық сақтау көпірі",
    paragraph:
      "Kazakhstan E-Health — Қазақстанның шалғай және ауылдық аймақтарындағы адамдарды білікті медициналық мамандармен байланыстыруға арналған цифрлық денсаулық сақтау платформасы. Біз медициналық көмекті қолжетімді, жылдам және инклюзивті етеміз — қай жерде болсаңыз да.",
  },
};

const Hero = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{t.title.split("\n").map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</h1>
        <p>{t.paragraph}</p>
      </div>
      <div className="hero-img">
        <img src={image} alt="hero" />
      </div>
    </section>
  );
};

export default Hero;
