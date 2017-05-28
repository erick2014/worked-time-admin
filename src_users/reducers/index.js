import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import users from "./users";
import {weeks,processedWeek} from "./weeks";


const rootReducer = combineReducers({
  routing: routerReducer,
  users: users,
  weeks: weeks,
  processedWeek:processedWeek
})

export default rootReducer
