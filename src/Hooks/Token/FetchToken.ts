"use client";
import Cookie from "cookie-universal";

const FetchToken = () => {
  const cookie = Cookie();
  const token = cookie.get("Bearer");
  return { token };
};

export default FetchToken;
