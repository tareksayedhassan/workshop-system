import React, { useEffect, useState } from "react";

const useGetLang = () => {
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    const local = localStorage.getItem("local");
    if (local) setLang(local);
  }, []);

  return { lang };
};

export default useGetLang;
