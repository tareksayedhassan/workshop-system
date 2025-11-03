import Lang from "./languages";

/**
 * Retrieve a localized string based on keyword and language.
 * Safe to use with SSR (checks for window before accessing localStorage).
 *
 * @param {string} keyword - الكلمة المراد ترجمتها
 * @param {string|null} local - اللغة المطلوبة (اختياري)
 * @returns {string} الكلمة المترجمة أو الكلمة الأصلية إذا مش موجودة
 */
export default function translate(keyword, local = null) {
  let lang = local;

  // نتأكد إن الكود بيتنفذ على المتصفح
  if (!lang && typeof window !== "undefined") {
    lang = window.localStorage.getItem("local") || "en";
  }

  return Lang[lang] && Lang[lang][keyword] ? Lang[lang][keyword] : keyword;
}
