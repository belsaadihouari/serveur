import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import transulationEN from "./local/en.json";
import transulationFR from "./local/fr.json";
import transulationDE from "./local/de.json";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: transulationEN,
  },

  fr: {
    translation: transulationFR,
  },
  de: {
    translation: transulationDE,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["localStorage", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
