const localeMap = {
  "en-CA": "English",
  "fr-CA": "French",
  "ko-KR": "Korean",
  "en-US": "English",
};

const getLocaleCode = (language) => {
  const locale = Object.entries(localeMap).find(
    ([, lang]) => lang === language,
  );
  return locale[0];
};

export const getLanguage = (locale = "en-CA") => locale.slice(0, 2);

export const getFullLanguage = (locale = "en-CA") => localeMap[locale];

export const getLocale = (queryURL, localePreference = "en-CA") => {
  // priority order: 1.language selection 2.user preference 3.browser setting
  const locale = queryURL
    ? getLocaleCode(queryURL.split("=")[1])
    : localePreference;

  return locale;
};
