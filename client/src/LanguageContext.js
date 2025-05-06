import React, { createContext, useState, useContext } from "react";

// Создаём контекст
const LanguageContext = createContext();

// Хук для доступа к языку
export const useLanguage = () => useContext(LanguageContext);

// Провайдер контекста
export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
