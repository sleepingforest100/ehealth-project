import React, { useState } from "react";
import "../styles/contact.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../LanguageContext";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const translations = {
  en: {
    heading: "Apply for Doctor",
    specialization: "Enter your specialization",
    experience: "Enter your experience (in years)",
    fees: "Enter your fees (in tenge)",
    button: "Apply",
    success: "Doctor application sent successfully",
    error: "Unable to send Doctor application",
    loading: "Sending doctor application...",
  },
  ru: {
    heading: "Подать заявку на врача",
    specialization: "Введите вашу специализацию",
    experience: "Введите ваш опыт (в годах)",
    fees: "Введите стоимость консультации (в тенге)",
    button: "Подать заявку",
    success: "Заявка врача успешно отправлена",
    error: "Не удалось отправить заявку врача",
    loading: "Отправка заявки врача...",
  },
  kz: {
    heading: "Дәрігер болуға өтініш беру",
    specialization: "Мамандығыңызды енгізіңіз",
    experience: "Тәжірибеңізді енгізіңіз (жылмен)",
    fees: "Қызмет ақыңызды енгізіңіз (тенгемен)",
    button: "Өтініш беру",
    success: "Дәрігер өтініші сәтті жіберілді",
    error: "Дәрігер өтінішін жіберу сәтсіз аяқталды",
    loading: "Дәрігер өтінішін жіберілуде...",
  },
};

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const btnClick = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/doctor/applyfordoctor",
          { formDetails },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: t.success,
          error: t.error,
          loading: t.loading,
        }
      );

      navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <section className="register-section flex-center apply-doctor" id="contact">
        <div className="register-container flex-center contact">
          <h2 className="form-heading">{t.heading}</h2>
          <form className="register-form">
            <input
              type="text"
              name="specialization"
              className="form-input"
              placeholder={t.specialization}
              value={formDetails.specialization}
              onChange={inputChange}
            />
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder={t.experience}
              value={formDetails.experience}
              onChange={inputChange}
            />
            <input
              type="number"
              name="fees"
              className="form-input"
              placeholder={t.fees}
              value={formDetails.fees}
              onChange={inputChange}
            />
            <button type="submit" className="btn form-btn" onClick={btnClick}>
              {t.button}
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyDoctor;
