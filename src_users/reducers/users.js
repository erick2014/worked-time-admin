
import { combineReducers } from 'redux'
import {
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
 } from '../constants'

export function users(state = [], { type, payload }) {
  switch (type) {
    case FETCH_USERS_SUCCESS:
    console.log("calling reducer..")
    debugger;
      return payload.users
    
    default:
      return state
  }
}

export function currentUser(state = {}, { type, payload }) {
  switch (type) {
    case FETCH_USER_SUCCESS:
      return payload.user
    default:
      return state
  }
}

export default combineReducers({
  users,
  currentUser
})