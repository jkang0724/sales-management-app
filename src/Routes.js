import React from "react";
import PageFrame from "./components/PageFrame";
import EmployeeList from "./feature/employee/EmployeeListPage";
import CompanyList from "./feature/company/CompanyListPage";
import EmployeeListForCompany from "./feature/company/EmployeeListForCompanyPage";
import UserLogin from "./feature/user/UserLoginPage";
import UserSave from "./feature/user/UserProfilePage";
import ProjectList from "./feature/project/ProjectListPage";
import EmployeeListForProject from "./feature/project/EmployeeListForProjectPage";
import InvoiceList from "./feature/invoice/InvoiceListPage";

const ROUTES = {
  employeeList: () => (
    <PageFrame>
      <EmployeeList />
    </PageFrame>
  ),
  companyList: () => (
    <PageFrame>
      <CompanyList />
    </PageFrame>
  ),
  employeeListForCompany: () => (
    <PageFrame>
      <EmployeeListForCompany />
    </PageFrame>
  ),
  projectList: () => (
    <PageFrame>
      <ProjectList />
    </PageFrame>
  ),
  employeeListForProject: () => (
    <PageFrame>
      <EmployeeListForProject />
    </PageFrame>
  ),
  invoiceList: () => (
    <PageFrame>
      <InvoiceList />
    </PageFrame>
  ),
  userLogin: () => <UserLogin />,
  userSave: () => (
    <PageFrame>
      <UserSave />
    </PageFrame>
  ),
};

export default ROUTES;
