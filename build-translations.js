const fs = require('fs');
const path = require('path');
// Note: add languages here to build more translations
const langs = ['id'];

const baseLocalePath = path.resolve(__dirname, 'src', 'locales');
const outputFileName = 'translation.json';

/**
 * getTranslationFiles - A helper function which reads all the translation files from locales folder and creates the json object.
 * @param lang - Name of the language to build the translation file.
 */
function getTranslationFiles(lang) {
  const translationLangPath = path.resolve(baseLocalePath, lang);
  // Getting all file names in language folder
  const files = fs.readdirSync(translationLangPath);
  // Filtering only translation files and ignoring the build file
  const translationFiles = files.filter((file) => file.includes('.json') && file !== outputFileName);

  let allTranslations = {};

  translationFiles.forEach((translationFileName) => {
    const translationFilePath = path.resolve(translationLangPath, translationFileName);
    // Requiring the json file (automatically reads the file in Json format).
    const fileTranslation = require(translationFilePath);
    allTranslations = Object.assign(allTranslations, fileTranslation);
  });
  return allTranslations;
}

langs.forEach((lang) => {
  const langTranslation = getTranslationFiles(lang);
  const translationFilePath = path.resolve(baseLocalePath, lang, outputFileName);
  fs.writeFile(translationFilePath, JSON.stringify(langTranslation), (err) => {
    if (err) {
      console.log(`Error in generating translation file for ${lang}, error:`, err);
    }
  });
});
