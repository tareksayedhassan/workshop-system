import Lang from "./languages";

/**
 * Retrieve a localized string based on keyword and language.
 * Safe to use with SSR (checks for window before accessing localStorage).
 *
 * @param {string} keyword
 * @param {string|null} local
 * @returns {string} ا
 *
 *  */
export default function translate(keyword, local = null) {
  let lang = local;

  if (!lang && typeof window !== "undefined") {
    lang = window.localStorage.getItem("local") || "en";
  }

  return Lang[lang] && Lang[lang][keyword] ? Lang[lang][keyword] : keyword;
}
