import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import LanguageProvider from "../LanguageProvider";

export const renderComponent = (locale, frontEnd, options) =>
  render(frontEnd, {
    wrapper: (props) => (
      <LanguageProvider locale={locale} {...props} {...options?.wrapperProps} />
    ),
    ...options,
  });

// constants for mock data
export const mockCompanies = [
  {
    id: 1,
    company_name: "Test comp",
    company_type: "1",
    company_type_description: "System owner",
    registration_no: "214-87-02608",
    person_in_charge: "Lee",
    phone_no: "010-8256-9236",
    email: "hshwang.capion@gmail.com",
    bank_account: "782-01-0026-121",
    status: "1",
    status_description: "Active",
    register_date: "2023-08-01T01:30:48.000Z",
    update_date: null,
  },
];

export const mockEmployees = [
  {
    id: 1,
    employee_name: "Test emp",
    employee_type: "1",
    employee_type_description: "Fulltime",
    bank: "TD Canada Trust",
    bank_account: "1234-567-888999",
    social_security_no: "000123-1234567",
    phone_no: "010-1234-5678",
    email: "john.doe0123@gmail.com",
    status: "1",
    status_description: "Active",
    register_date: "2023-08-01T01:30:48.000Z",
    update_date: null,
  },
];

export const mockCodes = [
  {
    id: 1,
    code_type: "company",
    code: "1",
    description: "System owner",
    register_date: "2023-07-13T16:47:32.000Z",
    update_date: null,
  },
  {
    id: 2,
    code_type: "company",
    code: "2",
    description: "Outsourcing company",
    register_date: "2023-07-13T16:47:32.000Z",
    update_date: null,
  },
  {
    id: 3,
    code_type: "company",
    code: "3",
    description: "Customer",
    register_date: "2023-07-13T16:47:32.000Z",
    update_date: null,
  },
  {
    id: 4,
    code_type: "company",
    code: "4",
    description: "Free lancer",
    register_date: "2023-07-13T16:47:32.000Z",
    update_date: null,
  },
  {
    id: 5,
    code_type: "employee",
    code: "1",
    description: "Fulltime",
    register_date: "2023-07-13T16:47:32.000Z",
    update_date: null,
  },
  {
    id: 6,
    code_type: "employee",
    code: "2",
    description: "Free lancer",
    register_date: "2023-07-13T16:47:32.000Z",
    update_date: null,
  },
  {
    id: 7,
    code_type: "invoice",
    code: "1",
    description: "Sales",
    register_date: "2023-07-13T16:47:32.000Z",
    update_date: null,
  },
  {
    id: 8,
    code_type: "invoice",
    code: "2",
    description: "Purchase",
    register_date: "2023-07-13T16:47:32.000Z",
    update_date: null,
  },
  {
    id: 9,
    code_type: "status",
    code: "1",
    description: "Active",
    register_date: "2023-07-13T16:47:32.000Z",
    update_date: null,
  },
  {
    id: 10,
    code_type: "status",
    code: "2",
    description: "Inactive",
    register_date: "2023-07-13T16:47:32.000Z",
    update_date: null,
  },
];

export const mockApiError = {};
