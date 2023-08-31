import React from "react";
import { IntlProvider } from "react-intl";
import PropTypes from "prop-types";
import enJson from "./language/en.json";
import koJson from "./language/ko.json";
import frJson from "./language/fr.json";

const languages = {
  en: enJson,
  ko: koJson,
  fr: frJson,
};

const LanguageProvider = ({ locale, children }) => {
  const language = locale.split("-")[0];

  return (
    <IntlProvider locale={locale} messages={languages[language]}>
      {children}
    </IntlProvider>
  );
};

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default LanguageProvider;
