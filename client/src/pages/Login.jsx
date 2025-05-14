import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import jwt_decode from "jwt-decode";
import fetchData from "../helper/apiCall";
import { useLanguage } from "../LanguageContext";


const translations = {
  en: {
    signIn: "Sign In",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    signInButton: "Sign In",
    notAUser: "Not a user?",
    register: "Register",
    errors: {
      emptyFields: "Input field should not be empty",
      shortPassword: "Password must be at least 5 characters long",
      loginSuccess: "Login successfully",
      loginPending: "Logging in...",
      loginError: "Unable to login user",
    }
  },
  ru: {
    signIn: "Войти",
    emailPlaceholder: "Введите вашу почту",
    passwordPlaceholder: "Введите ваш пароль",
    signInButton: "Войти",
    notAUser: "Еще нет аккаунта?",
    register: "Зарегистрироваться",
    errors: {
      emptyFields: "Поля не должны быть пустыми",
      shortPassword: "Пароль должен содержать не менее 5 символов",
      loginSuccess: "Успешный вход",
      loginPending: "Вход в систему...",
      loginError: "Не удалось войти",
    }
  },
  kz: {
    signIn: "Кіру",
    emailPlaceholder: "Электрон поштаңызды енгізіңіз",
    passwordPlaceholder: "Құпия сөзіңізді енгізіңіз",
    signInButton: "Кіру",
    notAUser: "Тіркелмегенсіз бе?",
    register: "Тіркелу",
    errors: {
      emptyFields: "Барлық мәліметтерді енгізу қажет",
      shortPassword: "Құпиясөз кемінде 5 таңбадан тұруы керек",
      loginSuccess: "Сәтті кірдіңіз",
      loginPending: "Кіру жүріп жатыр...",
      loginError: "Кіру сәтсіз аяқталды",
    }
  },
};


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Login() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const dispatch = useDispatch();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = formDetails;
      if (!email || !password) {
        return toast.error(t.errors.emptyFields);
      } else if (password.length < 5) {
        return toast.error(t.errors.shortPassword);
      }

      const { data } = await toast.promise(
        axios.post("/user/login", {
          email,
          password,
        }),
        {
          pending: t.errors.loginPending,
          success: t.errors.loginSuccess,
          error: t.errors.loginError,
          loading: t.errors.loginPending,
        }
      );
      localStorage.setItem("token", data.token);
      dispatch(setUserInfo(jwt_decode(data.token).userId));
      getUser(jwt_decode(data.token).userId);
    } catch (error) {
      return error;
    }
  };

  const getUser = async (id) => {
    try {
      const temp = await fetchData(`/user/getuser/${id}`);
      dispatch(setUserInfo(temp));
      return navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
      <h2 className="form-heading">{t.signIn}</h2>
        <form
          onSubmit={formSubmit}
          className="register-form"
        >
          <input
  type="email"
  name="email"
  className="form-input"
  placeholder={t.emailPlaceholder}
  value={formDetails.email}
  onChange={inputChange}
/>
<input
  type="password"
  name="password"
  className="form-input"
  placeholder={t.passwordPlaceholder}
  value={formDetails.password}
  onChange={inputChange}
/>
<button type="submit" className="btn form-btn">
  {t.signInButton}
</button>
        </form>
        <p>
  {t.notAUser}{" "}
  <NavLink className="login-link" to={"/register"}>
    {t.register}
  </NavLink>
</p>
      </div>
    </section>
  );
}

export default Login;
