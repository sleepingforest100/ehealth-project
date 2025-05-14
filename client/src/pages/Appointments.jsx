import React, { useEffect, useState, useCallback } from "react";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import { useLanguage } from "../LanguageContext";
import "../styles/user.css";

const translations = {
  en: {
    heading: "Your Appointments",
    sNo: "S.No",
    doctor: "Doctor",
    patient: "Patient",
    appointmentDate: "Appointment Date",
    appointmentTime: "Appointment Time",
    bookingDate: "Booking Date",
    bookingTime: "Booking Time",
    status: "Status",
    action: "Action",
    complete: "Complete",
    bookingSuccess: "Appointment marked as completed",
    bookingError: "Unable to mark appointment",
    bookingLoading: "Marking appointment...",
  },
  ru: {
    heading: "Ваши записи",
    sNo: "№",
    doctor: "Доктор",
    patient: "Пациент",
    appointmentDate: "Дата записи",
    appointmentTime: "Время записи",
    bookingDate: "Дата бронирования",
    bookingTime: "Время бронирования",
    status: "Статус",
    action: "Действие",
    complete: "Завершить",
    bookingSuccess: "Запись отмечена как завершенная",
    bookingError: "Не удалось отметить запись",
    bookingLoading: "Обработка записи...",
  },
  kz: {
    heading: "Сіздің жазбаларыңыз",
    sNo: "№",
    doctor: "Дәрігер",
    patient: "Пациент",
    appointmentDate: "Қабылдау күні",
    appointmentTime: "Қабылдау уақыты",
    bookingDate: "Брондау күні",
    bookingTime: "Брондау уақыты",
    status: "Күйі",
    action: "Әрекет",
    complete: "Аяқтау",
    bookingSuccess: "Қабылдау аяқталған деп белгіленді",
    bookingError: "Қабылдауды аяқтау мүмкін болмады",
    bookingLoading: "Қабылдауды белгілеу...",
  },
};

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const { userId } = jwt_decode(localStorage.getItem("token"));
  const { lang } = useLanguage();
  const t = translations[lang];

  const getAllAppoint = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/appointment/getallappointments?search=${userId}`);
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    getAllAppoint();
  }, [getAllAppoint]);

  const complete = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: ele?._id,
            doctorId: ele?.doctorId?._id,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: t.bookingSuccess,
          error: t.bookingError,
          loading: t.bookingLoading,
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">{t.heading}</h2>

          {appointments.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>{t.sNo}</th>
                    <th>{t.doctor}</th>
                    <th>{t.patient}</th>
                    <th>{t.appointmentDate}</th>
                    <th>{t.appointmentTime}</th>
                    <th>{t.bookingDate}</th>
                    <th>{t.bookingTime}</th>
                    <th>{t.status}</th>
                    {userId === appointments[0].doctorId?._id && <th>{t.action}</th>}
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((ele, i) => (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>
                        {ele?.doctorId?.firstname + " " + ele?.doctorId?.lastname}
                      </td>
                      <td>
                        {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                      </td>
                      <td>{ele?.date}</td>
                      <td>{ele?.time}</td>
                      <td>{ele?.createdAt?.split("T")[0]}</td>
                      <td>{ele?.updatedAt?.split("T")[1]?.split(".")[0]}</td>
                      <td>{ele?.status}</td>
                      {userId === ele?.doctorId?._id && (
                        <td>
                          <button
                            className={`btn user-btn accept-btn ${
                              ele?.status === "Completed" ? "disable-btn" : ""
                            }`}
                            disabled={ele?.status === "Completed"}
                            onClick={() => complete(ele)}
                          >
                            {t.complete}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default Appointments;
