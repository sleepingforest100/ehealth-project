import React from "react";
import "../styles/footer.css";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../LanguageContext"; // подключение

const translations = {
  en: {
    linksTitle: "Links",
    home: "Home",
    doctors: "Doctors",
    appointments: "Appointments",
    notifications: "Notifications",
    contact: "Contact Us",
    profile: "Profile",
    socialTitle: "Social links",
  },
  ru: {
    linksTitle: "Ссылки",
    home: "Главная",
    doctors: "Врачи",
    appointments: "Записи",
    notifications: "Уведомления",
    contact: "Связаться с нами",
    profile: "Профиль",
    socialTitle: "Социальные сети",
  },
  kz: {
    linksTitle: "Сілтемелер",
    home: "Басты бет",
    doctors: "Дәрігерлер",
    appointments: "Жазбалар",
    notifications: "Хабарламалар",
    contact: "Байланысу",
    profile: "Профиль",
    socialTitle: "Әлеуметтік желілер",
  },
};


const Footer = () => {
  const { lang } = useLanguage(); // получаем текущий язык
  const t = translations[lang];

  return (
    <>
      <footer>
        <div className="footer">
          <div className="footer-links">
            <h3>{t.linksTitle}</h3>
            <ul>
              <li>
                <NavLink to={"/"}>{t.home}</NavLink>
              </li>
              <li>
                <NavLink to={"/doctors"}>{t.doctors}</NavLink>
              </li>
              <li>
                <NavLink to={"/appointments"}>{t.appointments}</NavLink>
              </li>
              <li>
                <NavLink to={"/notifications"}>{t.notifications}</NavLink>
              </li>
              <li>
                <HashLink to={"/#contact"}>{t.contact}</HashLink>
              </li>
              <li>
                <NavLink to={"/profile"}>{t.profile}</NavLink>
              </li>
            </ul>
          </div>
          <div className="social">
            <h3>{t.socialTitle}</h3>
            <ul>
              <li className="facebook">
                <a
                  href="https://www.facebook.com/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li className="youtube">
                <a
                  href="https://www.youtube.com/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaYoutube />
                </a>
              </li>
              <li className="instagram">
                <a
                  href="https://www.instagram.com/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
};


export default Footer;
