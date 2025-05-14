import React, { useState } from "react";
import axios from "axios";
import "../styles/aidoctor.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../LanguageContext"; // Подключение контекста


const translations = {
  en: {
    chatHeading: "Medical Chatbot",
    placeholder: "Ask about symptoms or diseases...",
    responseHeading: "Response:",
    askButton: "Ask",
    loadingButton: "Loading...",
    errorMessage: "There was an error processing your request.",
  },
  ru: {
    chatHeading: "Медицинский чат-бот",
    placeholder: "Задайте вопросы о симптомах или заболеваниях...",
    responseHeading: "Ответ:",
    askButton: "Задать вопрос",
    loadingButton: "Загрузка...",
    errorMessage: "Произошла ошибка при обработке вашего запроса.",
  },
  kz: {
    chatHeading: "Медициналық чат-бот",
    placeholder: "Симптомдар немесе аурулар туралы сұрау қойыңыз...",
    responseHeading: "Жауап:",
    askButton: "Сұрау қою",
    loadingButton: "Жүктелуде...",
    errorMessage: "Сіздің сұрауыңызды өңдеу кезінде қате орын алды.",
  },
};


const Chat = () => {
  const { lang } = useLanguage(); // Получаем текущий язык
  const t = translations[lang]; // Получаем переведенные строки
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post("/aidoctor", {
        message: message,
        specialization: "general", // Adjust as needed
        language: lang,  // Adjust for multiple languages if needed
      });

      setResponse(result.data.result.response.message); // Adjust this based on the actual API response structure
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResponse(t.errorMessage); // Используем переведенное сообщение об ошибке
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="chat-section flex-center">
        <div className="chat-container flex-center">
          <h2 className="chat-heading">{t.chatHeading}</h2>
          <form className="chat-form" onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.placeholder}
              rows="6"
              cols="80"
              className="chat-input"
            />
            <br />
            <button type="submit" className="btn form-btn" disabled={loading}>
              {loading ? t.loadingButton : t.askButton}
            </button>
          </form>

          {response && (
            <div className="response-block">
              <h3>{t.responseHeading}</h3>
              <p>{response}</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Chat;
