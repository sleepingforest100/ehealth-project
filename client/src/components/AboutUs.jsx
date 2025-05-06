import React from "react";
import image from "../images/kaz_logo.jpg";
import { useLanguage } from "../LanguageContext"; // импорт контекста

const translations = {
  en: {
    heading: "About Us",
    p1: "Welcome to Kazakhstan E-Health – a revolutionary platform designed to transform healthcare access across Kazakhstan. We are committed to providing innovative digital solutions that cater to both remote and urban communities.",
    p2: "Our platform features an AI Doctor, powered by AMIE by Google, ensuring fast, reliable, and accurate medical consultations at your fingertips. Whether you need advice or a diagnosis, our AI Doctor is here to help.",
    p3: "With video consultations from certified healthcare professionals, accessing medical expertise is now easier than ever, no matter where you are. Additionally, our platform offers a simple and intuitive way to book appointments.",
  },
  ru: {
    heading: "О нас",
    p1: "Добро пожаловать в Kazakhstan E-Health – революционную платформу, созданную для трансформации доступа к здравоохранению по всему Казахстану. Мы стремимся предоставлять инновационные цифровые решения как для удалённых, так и для городских регионов.",
    p2: "Наша платформа предлагает ИИ-доктора на базе AMIE от Google, обеспечивающего быстрые, точные и надёжные медицинские консультации. Нужен совет или диагноз? ИИ-доктор всегда рядом.",
    p3: "Благодаря видеоконсультациям с сертифицированными специалистами, медицинская помощь теперь доступна в любой точке страны. Также у нас вы можете удобно записаться к врачу онлайн.",
  },
  kz: {
    heading: "Біз туралы",
    p1: "Қазақстандағы денсаулық сақтау жүйесін жаңартуға арналған Kazakhstan E-Health платформасына қош келдіңіз. Біз шалғай және қалалық аймақтарға арналған инновациялық сандық шешімдерді ұсынамыз.",
    p2: "Біздің платформамыз Google-дің AMIE жүйесіне негізделген ЖИ-дәрігерді ұсынады. Ол жылдам, сенімді және нақты медициналық кеңес береді. Сізге кеңес немесе алдын ала диагноз керек пе – ЖИ-дәрігер көмектеседі.",
    p3: "Сертификатталған дәрігерлермен бейне кеңестер арқылы медициналық көмек кез келген жерде қолжетімді. Сонымен қатар, дәрігерге онлайн жазылу өте оңай әрі ыңғайлы.",
  },
};

const AboutUs = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  return (
    <section className="container">
      <h2 className="page-heading about-heading">{t.heading}</h2>
      <div className="about">
        <div className="hero-img">
          <img src={image} alt="hero" />
        </div>
        <div className="hero-content">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
        </div>
      </div>
    </section>
  );

};

export default AboutUs;
