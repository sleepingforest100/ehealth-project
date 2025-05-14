import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/notification.css";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { useLanguage } from "../LanguageContext";
import "../styles/user.css";

const translations = {
  en: {
    heading: "Your Notifications",
    sNo: "S.No",
    content: "Content",
    date: "Date",
    time: "Time",
  },
  ru: {
    heading: "Ваши уведомления",
    sNo: "№",
    content: "Содержание",
    date: "Дата",
    time: "Время",
  },
  kz: {
    heading: "Сіздің хабарламаларыңыз",
    sNo: "№",
    content: "Мазмұны",
    date: "Күні",
    time: "Уақыты",
  },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const { lang } = useLanguage();
  const t = translations[lang];

  const getAllNotif = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/notification/getallnotifs`);
      setNotifications(temp);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getAllNotif();
  }, [getAllNotif]);

  return (
    <div className="page-wrapper">
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <main className="main-content">
          <section className="container notif-section">
            <h2 className="page-heading">{t.heading}</h2>

            {notifications.length > 0 ? (
              <div className="notifications">
                <table>
                  <thead>
                    <tr>
                      <th>{t.sNo}</th>
                      <th>{t.content}</th>
                      <th>{t.date}</th>
                      <th>{t.time}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((ele, i) => (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>{ele?.content}</td>
                        <td>{ele?.updatedAt?.split("T")[0]}</td>
                        <td>{ele?.updatedAt?.split("T")[1]?.split(".")[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Empty />
            )}
          </section>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default Notifications;
