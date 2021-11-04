import en from './en/translation.json';
import id from './id/translation.json';

/**
 * This file is separate from the './i18n.js' simply to make the Hot Module Replacement work seamlessly.
 * Your components can import this file in 'messages.js' files which would ruin the HMR if this isn't a separate module
 */

export const translations = {};
export const translationsJson = {
  en: {
    translation: en,
  },
  id: {
    translation: id,
  },
};

/*
 * Converts the static JSON file into an object where keys are identical
 * but values are strings concatenated according to syntax.
 * This is helpful when using the JSON file keys and still having the intellisense support
 * along with type-safety
 */
export const convertLanguageJsonToObject = (json, objToConvertTo = translations, current) => {
  Object.keys(json).forEach((key) => {
    const currentLookupKey = current ? `${current}.${key}` : key;
    if (typeof json[key] === 'object') {
      objToConvertTo[key] = {};
      convertLanguageJsonToObject(json[key], objToConvertTo[key], currentLookupKey);
    } else {
      objToConvertTo[key] = currentLookupKey;
    }
  });
};
