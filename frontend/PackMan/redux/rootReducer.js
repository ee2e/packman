import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import checksReducer from "./checksSlice";

export default combineReducers({
  usersReducer,
  checksReducer,
});
