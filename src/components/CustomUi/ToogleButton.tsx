import React, { useEffect, useState } from "react";
import { Settings } from "lucide-react";

export default function LanguageToggle2() {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("local") || "en";
    setSelectedLang(savedLang);
  }, []);

  const changeLanguage = (lang: string) => {
    if (lang === selectedLang) return;
    setSelectedLang(lang);
    localStorage.setItem("local", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.location.reload();
  };
  return (
    <div className="flex items-center gap-3 ">
      {/* Settings Icon - Rotating */}
      <div
        className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg p-2 shadow-md animate-spin hover:shadow-lg transition-shadow"
        style={{ animationDuration: "4s" }}
      >
        <Settings className="w-4 h-4 text-white" strokeWidth={2.5} />
      </div>

      {/* Main Box */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl  px-4 py-2 flex items-center gap-3 border border-gray-100">
        {/* Language Text */}
        <span className="text-gray-700 font-medium text-sm">
          Select language
        </span>

        {/* Toggle Container */}
        <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-full p-0.5 flex items-center gap-1 shadow-inner">
          {/* English Option */}
          <button
            onClick={() => {
              setSelectedLang("en");
              changeLanguage("en");
            }}
            className={`relative z-10 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-500 transform ${
              selectedLang === "en"
                ? "bg-gradient-to-br from-teal-400 to-teal-600 shadow-md scale-105"
                : "bg-transparent hover:bg-white/50"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${
                selectedLang === "en" ? "bg-white shadow-sm" : "bg-gray-50"
              }`}
            >
              <span className="text-lg">🇺🇸</span>
            </div>
          </button>

          {/* Arabic Option */}
          <button
            onClick={() => {
              setSelectedLang("ar");
              changeLanguage("ar");
            }}
            className={`relative z-10 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-500 transform ${
              selectedLang === "ar"
                ? "bg-gradient-to-br from-teal-400 to-teal-600 shadow-md scale-105"
                : "bg-transparent hover:bg-white/50"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${
                selectedLang === "ar" ? "bg-white shadow-sm" : "bg-gray-50"
              }`}
            >
              <span className="text-lg">🇪🇬</span>
            </div>
          </button>
        </div>

        <div className="px-3 py-1 bg-gradient-to-r from-teal-50 to-blue-50 rounded-full">
          <span className="text-xs font-semibold text-teal-700">
            {selectedLang === "en" ? "EN" : "AR"}
          </span>
        </div>
      </div>
    </div>
  );
}
