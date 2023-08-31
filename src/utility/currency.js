export const decimalFormat = (amount, intl) =>
  amount.toFixed(intl.locale === "ko-KR" ? 0 : 2);

export const convertToNumber = (strValue, intl) => {
  if (!strValue) {
    return null;
  }
  if (typeof strValue === "number") {
    return strValue;
  }

  let amount = strValue;
  amount =
    intl.locale === "fr-CA"
      ? amount
          .replace(/[^0-9.]/g, "")
          .replace(/,/g, ".")
          .replace(" ", "")
      : amount.replace(/[^0-9.]/g, "");
  return Math.round(parseFloat(amount));
};

export const currencyFormatter = (amount, intl) => {
  const decimal = intl.locale === "ko-KR" ? 0 : 0;
  let amountData = amount;
  if (typeof amountData === "string") {
    amountData = convertToNumber(amountData, intl);
  }
  return intl.formatNumber(amountData, {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });
};
