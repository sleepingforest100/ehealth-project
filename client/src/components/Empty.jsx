import React from "react";
import { useLanguage } from "../LanguageContext"; // импорт контекста


const translations = {
  en: {
    nothingToShow: "Nothing to show",
  },
  ru: {
    nothingToShow: "Нет информации",
  },
  kz: {
    nothingToShow: "Ақпарат жоқ",
  },
};


const Empty = () => {
  const { lang } = useLanguage(); // получаем текущий язык
  const t = translations[lang]; // выбираем перевод на основе текущего языка

  return <h2 className="nothing flex-center">{t.nothingToShow}</h2>;
};

export default Empty;
