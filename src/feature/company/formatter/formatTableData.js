const formatEmployListForCompanyData = () => {
  return [];
};

const columnsInTable = [
  "companyName",
  "companyTypeDescription",
  "address",
  "registrationNo",
  "phone",
  "statusDescription",
];

const formatCompanyListData = (pageData) => {
  return pageData.map((row) => {
    const fields = Object.entries(row);
    return fields.map((field) => ({
      id: field[0],
      data: field[1],
      visible: columnsInTable.includes(field[0]),
    }));
  });
};

export { formatCompanyListData, formatEmployListForCompanyData };
