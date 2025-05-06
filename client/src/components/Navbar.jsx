import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import jwt_decode from "jwt-decode";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    home: "Home",
    doctors: "Doctors",
    dashboard: "Dashboard",
    aiDoctor: "AI Doctor",
    appointments: "Appointments",
    notifications: "Notifications",
    applyForDoctor: "Apply for doctor",
    contactUs: "Contact Us",
    profile: "Profile",
    login: "Login",
    register: "Register",
    logout: "Logout",
    title: "Kazakhstan E-Health",
  },
  ru: {
    home: "Главная",
    doctors: "Врачи",
    dashboard: "Админка",
    aiDoctor: "ИИ Доктор",
    appointments: "Записи",
    notifications: "Уведомления",
    applyForDoctor: "Стать врачом",
    contactUs: "Контакты",
    profile: "Профиль",
    login: "Вход",
    register: "Регистрация",
    logout: "Выход",
    title: "Казахстан E-Здоровье",
  },
  kz: {
    home: "Басты бет",
    doctors: "Дәрігерлер",
    dashboard: "Басқару",
    aiDoctor: "ЖИ Дәрігер",
    appointments: "Кездесулер",
    notifications: "Хабарламалар",
    applyForDoctor: "Дәрігер болу",
    contactUs: "Байланыс",
    profile: "Профиль",
    login: "Кіру",
    register: "Тіркелу",
    logout: "Шығу",
    title: "Қазақстан E-Денсаулық",
  },
};


const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : ""
  );

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { lang, setLang } = useLanguage();
  const t = translations[lang];


  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>Kazakhstan E-Health</NavLink>
        </h2>
        <ul className="nav-links">

        <div className="language-switcher">
  <button onClick={() => setLang("en")}>EN</button>
  <button onClick={() => setLang("ru")}>RU</button>
  <button onClick={() => setLang("kz")}>KZ</button>
</div>

<li><NavLink to={"/"}>{t.home}</NavLink></li>
<li><NavLink to={"/doctors"}>{t.doctors}</NavLink></li>

{token && user.isAdmin && (
  <li><NavLink to={"/dashboard/users"}>{t.dashboard}</NavLink></li>
)}

{token && !user.isAdmin && (
  <>
    <li><NavLink to={"/aidoctor"}>{t.aiDoctor}</NavLink></li>
    <li><NavLink to={"/appointments"}>{t.appointments}</NavLink></li>
    <li><NavLink to={"/notifications"}>{t.notifications}</NavLink></li>
    <li><NavLink to={"/applyfordoctor"}>{t.applyForDoctor}</NavLink></li>
    <li><HashLink to={"/#contact"}>{t.contactUs}</HashLink></li>
    <li><NavLink to={"/profile"}>{t.profile}</NavLink></li>
  </>
)}
          {!token ? (
  <>
    <li><NavLink className="btn" to={"/login"}>{t.login}</NavLink></li>
    <li><NavLink className="btn" to={"/register"}>{t.register}</NavLink></li>
  </>
) : (
  <li><span className="btn" onClick={logoutFunc}>{t.logout}</span></li>
)}
        </ul>
      </nav>
      <div className="menu-icons">
        {!iconActive && (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true);
            }}
          />
        )}
        {iconActive && (
          <RxCross1
            className="menu-close"
            onClick={() => {
              setIconActive(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
