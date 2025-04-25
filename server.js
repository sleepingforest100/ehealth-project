const axios = require("axios"); // ← добавь вверху


const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/conn");
const userRouter = require("./routes/userRoutes");
const doctorRouter = require("./routes/doctorRoutes");
const appointRouter = require("./routes/appointRoutes");
const path = require("path");
const notificationRouter = require("./routes/notificationRouter");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// 🌐 AI Doctor Chat API (добавлен сюда)
const RAPIDAPI_HOST = 'ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com';

app.post('/aidoctor', async (req, res) => {
  const { message, specialization = 'general', language = 'en' } = req.body;
  if (!message) return res.status(400).json({ error: 'Field "message" is required' });

  try {
    const apiRes = await axios.post(
      `https://${RAPIDAPI_HOST}/chat?noqueue=1`,
      { message, specialization, language },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': 'a1ae4500d6msh126b4a071d9decfp17835fjsn8b9977caf602',
        }
      }
    );
    return res.json(apiRes.data);
  } catch (err) {
    console.error('AI Doctor API error:', err.response?.data || err.message);
    return res.status(502).json({ error: 'Ошибка при обращении к медицинскому API' });
  }
});

app.listen(port, () => {});


