import Lang from './languages'

/**
 * This function retrieves a localized string based on the provided keyword and language.
 * If the keyword is found in the specified language, the corresponding localized string is returned.
 * If the keyword is not found or the language is not specified, the original keyword is returned.
 *
 * @param {string} keyword - The keyword to be localized.
 * @param {string} [local=null] - The language code for localization. If not provided, the function will
 *                                check the 'local' value in the window.localStorage. If still not found,
 *                                it defaults to 'en'.
 *
 * @returns {string} The localized string corresponding to the keyword in the specified language.
 *                  If the keyword is not found or the language is not specified, the original keyword is returned.
 */
export default (keyword, local = null) => {
  local = local ?? window.localStorage.local ?? 'en'
  return Lang[local]?.[keyword] ?? keyword
}
