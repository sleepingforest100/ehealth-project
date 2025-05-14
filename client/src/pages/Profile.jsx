import React, { useCallback, useEffect, useState } from "react";
import "../styles/profile.css";
import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import fetchData from "../helper/apiCall";
import jwt_decode from "jwt-decode";
import { useLanguage } from "../LanguageContext";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const translations = {
  en: {
    heading: "Profile",
    firstName: "Enter your first name",
    lastName: "Enter your last name",
    email: "Enter your email",
    age: "Enter your age",
    mobile: "Enter your mobile number",
    address: "Enter your address",
    password: "Enter your password",
    confirmPassword: "Confirm your password",
    genderDefault: "Prefer not to say",
    genderMale: "Male",
    genderFemale: "Female",
    update: "Update",
    errors: {
      email: "Email should not be empty",
      firstname: "First name must be at least 3 characters long",
      lastname: "Last name must be at least 3 characters long",
      password: "Password must be at least 5 characters long",
      mismatch: "Passwords do not match",
    },
    loading: "Updating profile...",
    success: "Profile updated successfully",
    error: "Unable to update profile",
  },
  ru: {
    heading: "Профиль",
    firstName: "Введите ваше имя",
    lastName: "Введите вашу фамилию",
    email: "Введите ваш email",
    age: "Введите ваш возраст",
    mobile: "Введите ваш номер телефона",
    address: "Введите ваш адрес",
    password: "Введите ваш пароль",
    confirmPassword: "Подтвердите ваш пароль",
    genderDefault: "Предпочитаю не указывать",
    genderMale: "Мужской",
    genderFemale: "Женский",
    update: "Обновить",
    errors: {
      email: "Email не должен быть пустым",
      firstname: "Имя должно содержать не менее 3 символов",
      lastname: "Фамилия должна содержать не менее 3 символов",
      password: "Пароль должен быть не менее 5 символов",
      mismatch: "Пароли не совпадают",
    },
    loading: "Обновление профиля...",
    success: "Профиль успешно обновлён",
    error: "Не удалось обновить профиль",
  },
  kz: {
    heading: "Профиль",
    firstName: "Атыңызды енгізіңіз",
    lastName: "Тегіңізді енгізіңіз",
    email: "Электронды поштаңызды енгізіңіз",
    age: "Жасыңызды енгізіңіз",
    mobile: "Телефон нөміріңізді енгізіңіз",
    address: "Мекенжайыңызды енгізіңіз",
    password: "Құпиясөзді енгізіңіз",
    confirmPassword: "Құпиясөзді растаңыз",
    genderDefault: "Көрсеткім келмейді",
    genderMale: "Ер",
    genderFemale: "Әйел",
    update: "Жаңарту",
    errors: {
      email: "Электронды пошта бос болмауы керек",
      firstname: "Атыңыз кем дегенде 3 әріптен тұруы керек",
      lastname: "Тегіңіз кем дегенде 3 әріптен тұруы керек",
      password: "Құпиясөз кемінде 5 таңбадан тұруы керек",
      mismatch: "Құпиясөздер сәйкес емес",
    },
    loading: "Профиль жаңартылуда...",
    success: "Профиль сәтті жаңартылды",
    error: "Профильді жаңарту сәтсіз аяқталды",
  },
};

function Profile() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const { userId } = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const [file, setFile] = useState("");
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    mobile: "",
    gender: "neither",
    address: "",
    password: "",
    confpassword: "",
  });

  const getUser = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/user/getuser/${userId}`);
      setFormDetails({
        ...temp,
        password: "",
        confpassword: "",
        mobile: temp.mobile === null ? "" : temp.mobile,
        age: temp.age === null ? "" : temp.age,
      });
      setFile(temp.pic);
      dispatch(setLoading(false));
    } catch (error) {
      // handle error if needed
    }
  }, [dispatch, userId]);
  
  useEffect(() => {
    getUser();
  }, [getUser]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { firstname, lastname, email, age, mobile, address, gender, password, confpassword } = formDetails;

      if (!email) return toast.error(t.errors.email);
      if (firstname.length < 3) return toast.error(t.errors.firstname);
      if (lastname.length < 3) return toast.error(t.errors.lastname);
      if (password.length < 5) return toast.error(t.errors.password);
      if (password !== confpassword) return toast.error(t.errors.mismatch);

      await toast.promise(
        axios.put(
          "/user/updateprofile",
          { firstname, lastname, age, mobile, address, gender, email, password },
          { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
        ),
        {
          pending: t.loading,
          success: t.success,
          error: t.error,
        }
      );

      setFormDetails({ ...formDetails, password: "", confpassword: "" });
    } catch {
      toast.error(t.error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="register-section flex-center">
          <div className="profile-container flex-center">
            <h2 className="form-heading">{t.heading}</h2>
            <img src={file} alt="profile" className="profile-pic" />
            <form onSubmit={formSubmit} className="register-form">
              <div className="form-same-row">
                <input type="text" name="firstname" className="form-input" placeholder={t.firstName} value={formDetails.firstname} onChange={inputChange} />
                <input type="text" name="lastname" className="form-input" placeholder={t.lastName} value={formDetails.lastname} onChange={inputChange} />
              </div>
              <div className="form-same-row">
                <input type="email" name="email" className="form-input" placeholder={t.email} value={formDetails.email} onChange={inputChange} />
                <select name="gender" value={formDetails.gender} className="form-input" onChange={inputChange}>
                  <option value="neither">{t.genderDefault}</option>
                  <option value="male">{t.genderMale}</option>
                  <option value="female">{t.genderFemale}</option>
                </select>
              </div>
              <div className="form-same-row">
                <input type="text" name="age" className="form-input" placeholder={t.age} value={formDetails.age} onChange={inputChange} />
                <input type="text" name="mobile" className="form-input" placeholder={t.mobile} value={formDetails.mobile} onChange={inputChange} />
              </div>
              <textarea name="address" className="form-input" placeholder={t.address} value={formDetails.address} onChange={inputChange} rows="2" />
              <div className="form-same-row">
                <input type="password" name="password" className="form-input" placeholder={t.password} value={formDetails.password} onChange={inputChange} />
                <input type="password" name="confpassword" className="form-input" placeholder={t.confirmPassword} value={formDetails.confpassword} onChange={inputChange} />
              </div>
              <button type="submit" className="btn form-btn">
                {t.update}
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default Profile;
