const dateFormat = (intl) => {
  const language = intl?.locale;

  switch (language) {
    case "en":
      return "MM/DD/YYYY";
    case "fr":
      return "DD/MM/YYYY";
    case "ko":
    default:
      return "YYYY-MM-DD";
  }
};

export default dateFormat;
