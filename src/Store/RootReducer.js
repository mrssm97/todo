import { combineReducers } from "@reduxjs/toolkit";
import TodoReducer from "./TodoReducer";

const rootReducer = combineReducers({
  TodoState: TodoReducer,
});
export default rootReducer;
