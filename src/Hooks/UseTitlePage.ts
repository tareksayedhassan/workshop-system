"use client";
import { useEffect } from "react";

const UseTitlePage = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default UseTitlePage;
