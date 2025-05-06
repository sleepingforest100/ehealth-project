import "../styles/doctorcard.css";
import React, { useState } from "react";
import BookAppointment from "../components/BookAppointment";
import { toast } from "react-hot-toast";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    specialization: "Specialization",
    experience: "Experience",
    years: "yrs",
    fees: "Fees per consultation",
    phone: "Phone",
    book: "Book Appointment",
    loginError: "You must log in first",
  },
  ru: {
    specialization: "Специализация",
    experience: "Опыт",
    years: "лет",
    fees: "Стоимость консультации",
    phone: "Телефон",
    book: "Записаться на приём",
    loginError: "Сначала войдите в систему",
  },
  kz: {
    specialization: "Мамандығы",
    experience: "Тәжірибесі",
    years: "жыл",
    fees: "Кеңес ақысы",
    phone: "Телефон",
    book: "Кездесуге жазылу",
    loginError: "Алдымен жүйеге кіріңіз",
  },
};


const DoctorCard = ({ ele }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const { lang } = useLanguage(); // получаем язык
  const t = translations[lang];  // выбираем нужный перевод

  const handleModal = () => {
    if (token === "") {
      return toast.error(t.loginError);
    }
    setModalOpen(true);
  };

  return (
    <div className="card">
      <div className="card-img flex-center">
        <img
          src={
            ele?.userId?.pic ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="profile"
        />
      </div>
      <h3 className="card-name">
        Dr. {ele?.userId?.firstname + " " + ele?.userId?.lastname}
      </h3>
      <p className="specialization">
        <strong>{t.specialization}: </strong>
        {ele?.specialization}
      </p>
      <p className="experience">
        <strong>{t.experience}: </strong>
        {ele?.experience} {t.years}
      </p>
      <p className="fees">
        <strong>{t.fees}: </strong>$ {ele?.fees}
      </p>
      <p className="phone">
        <strong>{t.phone}: </strong>
        {ele?.userId?.mobile}
      </p>
      <button
        className="btn appointment-btn"
        onClick={handleModal}
      >
        {t.book}
      </button>
      {modalOpen && (
        <BookAppointment
          setModalOpen={setModalOpen}
          ele={ele}
        />
      )}
    </div>
  );
};


export default DoctorCard;
