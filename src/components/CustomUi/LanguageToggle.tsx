"use client";
import React, { useEffect, useState } from "react";
import Lang from "../../../public/localization/languages/index"; // ملف الترجمة

const LanguageToggle = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // استرجاع اللغة المحفوظة من localStorage أو تعيين "en" كافتراضي
    const savedLang = localStorage.getItem("local") || "en";
    setLanguage(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    localStorage.setItem("local", newLang);
    // تحديث اتجاه الصفحة لو حبيت تضيف RTL لاحقًا
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <div className="flex items-center">
      <span className="mr-3 text-gray-600">
        {language === "en" ? "English" : "العربية"}
      </span>

      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            onChange={toggleLanguage}
            checked={language === "ar"}
          />
          <div
            className={`block w-14 h-8 rounded-full transition-all duration-300 ease-in-out ${
              language === "ar" ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
              language === "ar" ? "translate-x-6" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default LanguageToggle;
