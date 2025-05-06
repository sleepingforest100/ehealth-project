import React from "react";
import CountUp from "react-countup";
import "../styles/homecircles.css";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    patientsLine1: "Satisfied",
    patientsLine2: "Patients",
    verifiedLine1: "Verified",
    verifiedLine2: "Doctors",
    specialistLine1: "Specialist",
    specialistLine2: "Doctors",
  },
  ru: {
    patientsLine1: "Удовлетворённых",
    patientsLine2: "пациентов",
    verifiedLine1: "Проверенных",
    verifiedLine2: "врачей",
    specialistLine1: "Врачей",
    specialistLine2: "специалистов",
  },
  kz: {
    patientsLine1: "Риза болған",
    patientsLine2: "науқастар",
    verifiedLine1: "Тексерілген",
    verifiedLine2: "дәрігерлер",
    specialistLine1: "Маманданған",
    specialistLine2: "дәрігерлер",
  },
};


const HomeCircles = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <section className="container circles">
      <div className="circle">
        <CountUp start={0} end={7000} delay={0} enableScrollSpy scrollSpyDelay={500}>
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          {t.patientsLine1}<br />{t.patientsLine2}
        </span>
      </div>
      <div className="circle">
        <CountUp start={0} end={500} delay={0} enableScrollSpy scrollSpyDelay={500}>
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          {t.verifiedLine1}<br />{t.verifiedLine2}
        </span>
      </div>
      <div className="circle">
        <CountUp start={0} end={200} delay={0} enableScrollSpy scrollSpyDelay={500}>
          {({ countUpRef }) => (
            <div className="counter">
              <span ref={countUpRef} />+
            </div>
          )}
        </CountUp>
        <span className="circle-name">
          {t.specialistLine1}<br />{t.specialistLine2}
        </span>
      </div>
    </section>
  );
};

export default HomeCircles;
