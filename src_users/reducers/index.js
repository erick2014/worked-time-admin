import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import users from "./users";
import weeks from "./weeks";

const rootReducer = combineReducers({
  routing: routerReducer,
  users: users,
  weeks: weeks
})

export default rootReducer
