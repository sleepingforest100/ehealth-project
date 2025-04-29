const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // Проверяем наличие заголовка с токеном
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    
    if (!token) {
      return res.status(401).send("Token is missing");
    }

    // Верификация токена
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // Если токен не прошел верификацию (например, токен истек), отправляем ошибку
    if (!verifyToken) {
      return res.status(401).send("Token error");
    }

    // Записываем userId в request для дальнейшего использования
    req.userId = verifyToken.userId;

    // Переходим к следующему middleware или контроллеру
    next();
  } catch (error) {
    // Обработка ошибок, связанных с истекшим токеном или другими проблемами
    console.error(error);
    
    // Проверяем, если ошибка связана с истекшим токеном
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token has expired");
    }

    // Для остальных ошибок отдаем общий ответ
    return res.status(500).send("Server error");
  }
};

module.exports = auth;
