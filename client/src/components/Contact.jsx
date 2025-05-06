import React, { useState } from "react";
import "../styles/contact.css";
import { useLanguage } from "../LanguageContext"; // не забудьте подключить

const translations = {
  en: {
    heading: "Contact Us",
    namePlaceholder: "Enter your name",
    emailPlaceholder: "Enter your email",
    messagePlaceholder: "Enter your message",
    send: "Send",
  },
  ru: {
    heading: "Свяжитесь с нами",
    namePlaceholder: "Введите ваше имя",
    emailPlaceholder: "Введите ваш email",
    messagePlaceholder: "Введите ваше сообщение",
    send: "Отправить",
  },
  kz: {
    heading: "Байланыс",
    namePlaceholder: "Атыңызды енгізіңіз",
    emailPlaceholder: "Электронды поштаңызды енгізіңіз",
    messagePlaceholder: "Хабарламаңызды енгізіңіз",
    send: "Жіберу",
  },
};

const Contact = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { lang } = useLanguage(); // получаем текущий язык
  const t = translations[lang];

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  return (
    <section className="register-section flex-center" id="contact">
      <div className="contact-container flex-center contact">
        <h2 className="form-heading">{t.heading}</h2>
        <form
          method="POST"
          action={`https://formspree.io/f/meoawekw`}
          className="register-form"
        >
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder={t.namePlaceholder}
            value={formDetails.name}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder={t.emailPlaceholder}
            value={formDetails.email}
            onChange={inputChange}
          />
          <textarea
            name="message"
            className="form-input"
            placeholder={t.messagePlaceholder}
            value={formDetails.message}
            onChange={inputChange}
            rows="8"
            cols="12"
          ></textarea>

          <button type="submit" className="btn form-btn">
            {t.send}
          </button>
        </form>
      </div>
    </section>
  );
};


export default Contact;
