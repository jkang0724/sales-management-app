import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import mainReducer from "./mainReducer";

// redux - store middleware
const store = createStore(mainReducer, applyMiddleware(logger, thunk));

export default store;
