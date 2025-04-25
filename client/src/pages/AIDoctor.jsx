import React, { useState } from "react";
import axios from "axios";
import "../styles/aidoctor.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Chat = () => {
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
        language: "en", // Adjust for multiple languages if needed
      });

      setResponse(result.data.result.response.message); // Adjust this based on the actual API response structure
    } catch (error) {
      console.error("Error fetching data: ", error);
      setResponse("There was an error processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="chat-section flex-center">
        <div className="chat-container flex-center">
          <h2 className="chat-heading">Medical Chatbot</h2>
          <form className="chat-form" onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about symptoms or diseases..."
              rows="6"
              cols="80"
              className="chat-input"
            />
            <br />
            <button type="submit" className="btn form-btn" disabled={loading}>
              {loading ? "Loading..." : "Ask"}
            </button>
          </form>

          {response && (
            <div className="response-block">
              <h3>Response:</h3>
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
