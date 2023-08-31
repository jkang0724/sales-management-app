import { combineReducers } from "redux";
import employeeReducer from "../feature/employee/employee.reducer";
import commonCodeReducer from "../feature/utilities/common.reducer";
import authReducer from "./authentication/auth.reducer";
import userProfileEditReducer from "../feature/user/userProfile/userProfile.reducer";
import companyReducer from "../feature/company/company.reducer";
import companyEmployeeReducer from "../feature/company/companyEmployee.reducer";
import apiErrorReducer from "./apiError/apiError.reducer";
import projectReducer from "../feature/project/project.reducer";
import projectEmployeeReducer from "../feature/project/projectEmployee.reducer";
import projectFulfillmentReducer from "../feature/project/projectFulfillment.reducer";
import invoiceReducer from "../feature/invoice/invoice.reducer";

// main reducer to combine two reducers together
const applicationReducer = combineReducers({
  employeeStore: employeeReducer,
  codeStore: commonCodeReducer,
  authStore: authReducer,
  userProfileEditStore: userProfileEditReducer,
  companyStore: companyReducer,
  companyEmployeeStore: companyEmployeeReducer,
  apiErrorStore: apiErrorReducer,
  projectStore: projectReducer,
  projectEmployeeStore: projectEmployeeReducer,
  projectFulfillmentStore: projectFulfillmentReducer,
  invoiceStore: invoiceReducer,
});

const mainReducer = (state, action) => {
  return applicationReducer(state, action);
};

export default mainReducer;
