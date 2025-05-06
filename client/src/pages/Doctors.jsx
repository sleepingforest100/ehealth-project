import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";
import { useLanguage } from "../LanguageContext";

const translations = {
  en: {
    heading: "Our Doctors",
  },
  ru: {
    heading: "Наши врачи",
  },
  kz: {
    heading: "Біздің дәрігерлер",
  },
};


const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDocs = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/doctor/getalldoctors`);
    setDoctors(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchAllDocs();
  }, []);

  const { lang } = useLanguage();
const t = translations[lang];


  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container doctors">
          <h2 className="page-heading">{t.heading}</h2>

          {doctors.length > 0 ? (
            <div className="doctors-card-container">
              {doctors.map((ele) => {
                return (
                  <DoctorCard
                    ele={ele}
                    key={ele._id}
                  />
                );
              })}
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
      <Footer />
    </>
  );
};

export default Doctors;
