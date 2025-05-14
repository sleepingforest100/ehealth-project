import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    heading: "Sign Up",
    firstName: "Enter your first name",
    lastName: "Enter your last name",
    email: "Enter your email",
    password: "Enter your password",
    confirmPassword: "Confirm your password",
    signUp: "Sign Up",
    alreadyUser: "Already a user?",
    login: "Log in",
    errors: {
      empty: "Input field should not be empty",
      fnameShort: "First name must be at least 3 characters long",
      lnameShort: "Last name must be at least 3 characters long",
      passShort: "Password must be at least 5 characters long",
      mismatch: "Passwords do not match",
      picMissing: "Please select an image in jpeg or png format",
      registering: "Registering user...",
      success: "User registered successfully",
      fail: "Unable to register user",
    },
    profilePicText: "Choose your profile picture",
  },
  ru: {
    heading: "Регистрация",
    firstName: "Введите ваше имя",
    lastName: "Введите вашу фамилию",
    email: "Введите вашу почту",
    password: "Введите пароль",
    confirmPassword: "Подтвердите пароль",
    signUp: "Зарегистрироваться",
    alreadyUser: "Уже есть аккаунт?",
    login: "Войти",
    errors: {
      empty: "Поля не должны быть пустыми",
      fnameShort: "Имя должно содержать не менее 3 символов",
      lnameShort: "Фамилия должна содержать не менее 3 символов",
      passShort: "Пароль должен быть не менее 5 символов",
      mismatch: "Пароли не совпадают",
      picMissing: "Выберите изображение в формате jpeg или png",
      registering: "Регистрация пользователя...",
      success: "Пользователь успешно зарегистрирован",
      fail: "Не удалось зарегистрировать пользователя",
    },
    profilePicText: "Выберите ваше фото для профиля", 
  },
  kz: {
    heading: "Тіркелу",
    firstName: "Атыңызды енгізіңіз",
    lastName: "Тегіңізді енгізіңіз",
    email: "Электрондық поштаңызды енгізіңіз",
    password: "Құпия сөзді енгізіңіз",
    confirmPassword: "Құпия сөзді растаңыз",
    signUp: "Тіркелу",
    alreadyUser: "Бұрын тіркелгенсіз бе?",
    login: "Кіру",
    errors: {
      empty: "Өрістерді толтырыңыз",
      fnameShort: "Атыңыз кемінде 3 таңбадан тұруы керек",
      lnameShort: "Тегіңіз кемінде 3 таңбадан тұруы керек",
      passShort: "Құпия сөз кемінде 5 таңбадан тұруы керек",
      mismatch: "Құпия сөздер сәйкес емес",
      picMissing: "jpeg немесе png форматында сурет таңдаңыз",
      registering: "Пайдаланушы тіркелуде...",
      success: "Пайдаланушы сәтті тіркелді",
      fail: "Тіркелу сәтсіз аяқталды",
    },
    profilePicText:"Профиль суретіңізді таңдаңыз",
  },
};


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Register() {
  const { lang } = useLanguage();
const t = translations[lang];

  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onUpload = async (element) => {
    setLoading(true);
    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => setFile(data.url.toString()));
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(t.errors.picMissing);

    }
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
  
      if (loading) return;
      if (file === "") return;
  
      const { firstname, lastname, email, password, confpassword } = formDetails;
  
      if (!firstname || !lastname || !email || !password || !confpassword) {
        return toast.error(t.errors.empty);
      } else if (firstname.length < 3) {
        return toast.error(t.errors.fnameShort);
      } else if (lastname.length < 3) {
        return toast.error(t.errors.lnameShort);
      } else if (password.length < 5) {
        return toast.error(t.errors.passShort);
      } else if (password !== confpassword) {
        return toast.error(t.errors.mismatch);
      }
  
      await toast.promise(
        axios.post("/user/register", {
          firstname,
          lastname,
          email,
          password,
          pic: file,
        }),
        {
          pending: t.errors.registering,
          success: t.errors.success,
          error: t.errors.fail,
          loading: t.errors.registering,
        }
      );
      return navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(t.errors.fail);
    }
  };
  

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">{t.heading}</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="firstname"
            className="form-input"
            placeholder={t.firstName}
            value={formDetails.firstname}
            onChange={inputChange}
          />
          <input
            type="text"
            name="lastname"
            className="form-input"
            placeholder={t.lastName}
            value={formDetails.lastname}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder={t.email}
            value={formDetails.email}
            onChange={inputChange}
          />
           <label htmlFor="profile-pic" className="form-label">
          {t.profilePicText || "Choose your profile picture (It should be your photo)"}
        </label>
          <input
            type="file"
            onChange={(e) => onUpload(e.target.files[0])}
            name="profile-pic"
            id="profile-pic"
            className="form-input"
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder={t.password}
            value={formDetails.password}
            onChange={inputChange}
          />
          <input
            type="password"
            name="confpassword"
            className="form-input"
            placeholder={t.confirmPassword}
            value={formDetails.confpassword}
            onChange={inputChange}
          />
          <button
            type="submit"
            className="btn form-btn"
            disabled={loading}
          >
            {t.signUp}
          </button>
        </form>
        <p>
          {t.alreadyUser}{" "}
          <NavLink className="login-link" to={"/login"}>
            {t.login}
          </NavLink>
        </p>
      </div>
    </section>
  );
  
}

export default Register;
