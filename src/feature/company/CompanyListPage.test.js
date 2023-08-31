import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { IntlProvider, createIntl, createIntlCache } from "react-intl";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import nock from "nock";

import mainReducer from "../../store/mainReducer";
import {
  mockCompanies,
  mockCodes,
  renderComponent,
} from "../../utility/testHelper";
import CompanyList from "./CompanyListPage";
import enJson from "../../language/en.json";
import koJson from "../../language/ko.json";
import frJson from "../../language/fr.json";
import { toastSend } from "../../components/toastify";

jest.mock("../../utility/utils");
jest.mock("../../components/toastify/toastSend", () => {
  return { toastSend: jest.fn() };
});

// locale (language) to be tested
// snapshot currently in English, should be refreshed when testing a different locale
const testLocale = "en";
const languages = {
  en: enJson,
  ko: koJson,
  fr: frJson,
};
const cache = createIntlCache();
const intl = createIntl(
  {
    locale: testLocale,
    messages: languages[testLocale],
  },
  cache,
);

const initialTestState = {
  codeStore: {
    loading: false,
    codes: [],
  },
  companyStore: {
    loading: false,
    companies: [],
    company: {},
    isOutdated: true,
  },
  apiErrorStore: {
    errorStatus: null,
  },
};
const errorState = {
  ...initialTestState,
  apiErrorStore: {
    errorStatus: { message: "Internal service error" },
  },
};

const getComponent = ({
  testState = initialTestState,
  locale = testLocale,
}) => {
  const testStore = createStore(
    mainReducer,
    testState,
    compose(applyMiddleware(thunk)),
  );

  const component = (
    <IntlProvider locale={locale} messages={languages[locale]}>
      <Provider store={testStore}>
        <CompanyList />
      </Provider>
    </IntlProvider>
  );
  return { component };
};

const addCompany = intl.formatMessage({ id: "company.add" });
const editCompany = intl.formatMessage({ id: "editModal.editCompany" });
const editText = intl.formatMessage({ id: "common.edit" });
const deleteText = intl.formatMessage({ id: "common.delete" });
const saveText = intl.formatMessage({ id: "common.save" });
const cancelText = intl.formatMessage({ id: "common.cancel" });
const searchBarText = intl.formatMessage({ id: "common.searchByKeyword" });

beforeEach(() => {
  jest.clearAllMocks();
  nock("http://localhost").get("/api/code").reply(200, mockCodes);
  nock("http://localhost").get("/api/company").reply(200, mockCompanies);
});

afterAll(() => {
  nock.cleanAll();
});

describe("CompanyList component", () => {
  // Snapshot test
  it("renders correctly (snapshot)", () => {
    const { component } = getComponent({});
    const { asFragment } = renderComponent(testLocale, component);
    expect(asFragment()).toMatchSnapshot();
  });
  // DOM tests
  it("should show the add button", () => {
    const { component } = getComponent({});
    renderComponent(testLocale, component);
    expect(screen.getByText(addCompany)).toBeInTheDocument();
  });

  it("should show the add modal when Add Company button is clicked", () => {
    const { component } = getComponent({});
    renderComponent(testLocale, component);
    fireEvent.click(screen.getByRole("button", { name: addCompany }));
    expect(
      screen.getByRole("heading", { level: 2, name: addCompany }),
    ).toBeInTheDocument();
  });

  it("should close the add modal when Cancel button is clicked", () => {
    const { component } = getComponent({});
    renderComponent(testLocale, component);
    fireEvent.click(screen.getByRole("button", { name: addCompany }));
    fireEvent.click(screen.getByRole("button", { name: cancelText }));
    expect(
      screen.queryByRole("heading", { level: 2, name: addCompany }),
    ).not.toBeInTheDocument();
  });
});

describe("action request", () => {
  it("should show the company list after companies are loaded", async () => {
    const { component } = getComponent({});
    renderComponent(testLocale, component);
    await waitFor(() => {
      expect(screen.getByText("Test comp")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: editText }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: deleteText }),
      ).toBeInTheDocument();
    });
  });

  it("should only show filtered companies after entering a search text", async () => {
    const { component } = getComponent({});
    renderComponent(testLocale, component);
    await waitFor(() => {
      const searchInput = screen.getByRole("textbox", {
        name: `${searchBarText}:`,
      });
      fireEvent.change(searchInput, { target: { value: "Test" } });
      expect(screen.getByText("System owner")).toBeInTheDocument();
      fireEvent.change(searchInput, { target: { value: "foo" } });
      expect(screen.queryByText("System owner")).not.toBeInTheDocument();
    });
  });

  it("should show the edit modal when Edit button is clicked", async () => {
    nock("http://localhost").get("/api/company/1").reply(200, mockCompanies);
    const { component } = getComponent({});
    renderComponent(testLocale, component);
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: editText }));
      expect(
        screen.getByRole("heading", { level: 2, name: editCompany }),
      ).toBeInTheDocument();
    });
  });

  it("should show the delete modal when Delete button is clicked", async () => {
    nock("http://localhost").delete("/api/company/1").reply(200);
    const { component } = getComponent({});
    renderComponent(testLocale, component);
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: deleteText }));
      expect(
        screen.getByText(`${deleteText} company: Test comp`),
      ).toBeInTheDocument();
    });
  });

  it("should dispatch save request and close the add/edit modal if Save button is clicked", async () => {
    nock("http://localhost").post("/api/company").reply(200);
    const { component } = getComponent({});
    renderComponent(testLocale, component);
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: addCompany }));
      const companyNameInput = screen.getByRole("textbox", {
        name: `${intl.formatMessage({ id: "common.name" })}:`,
      });
      const addressInput = screen.getByRole("textbox", {
        name: `${intl.formatMessage({ id: "common.address" })}:`,
      });
      const registrationInput = screen.getByRole("textbox", {
        name: `${intl.formatMessage({ id: "company.regNo" })}:`,
      });
      const personInChargeInput = screen.getByRole("textbox", {
        name: `${intl.formatMessage({ id: "company.personInCharge" })}:`,
      });
      const phoneInput = screen.getByRole("textbox", {
        name: `${intl.formatMessage({ id: "common.phone" })}:`,
      });
      const emailInput = screen.getByRole("textbox", {
        name: `${intl.formatMessage({ id: "common.email" })}:`,
      });
      const bankInput = screen.getByRole("textbox", {
        name: `${intl.formatMessage({ id: "common.bank" })}:`,
      });
      const bankAccountInput = screen.getByRole("textbox", {
        name: `${intl.formatMessage({ id: "common.bankAccount" })}:`,
      });
      fireEvent.change(companyNameInput, { target: { value: "newComp" } });
      fireEvent.change(addressInput, { target: { value: "newAddr" } });
      fireEvent.change(registrationInput, { target: { value: "newRegNo" } });
      fireEvent.change(personInChargeInput, { target: { value: "newBoss" } });
      fireEvent.change(phoneInput, { target: { value: "newPhone" } });
      fireEvent.change(emailInput, { target: { value: "newEmail" } });
      fireEvent.change(bankInput, { target: { value: "newBank" } });
      fireEvent.change(bankAccountInput, { target: { value: "newBankAcc" } });
      fireEvent.click(screen.getByRole("button", { name: saveText }));
      expect(
        screen.queryByRole("heading", { level: 2, name: addCompany }),
      ).not.toBeInTheDocument();
    });
  });

  it("should display a toast error message if database is unreacheable", async () => {
    const { component } = getComponent({ testState: errorState });
    renderComponent(testLocale, component);
    await waitFor(() => expect(toastSend).toHaveBeenCalledTimes(1));
  });
});
