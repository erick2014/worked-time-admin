
import { combineReducers } from 'redux'
import { FETCH_USERS_SUCCESS } from '../constants'

export function users(state = [], { type, payload }) {
  switch (type) {
    case FETCH_USERS_SUCCESS:
      return payload.users
    
    default:
      return state
  }
}

export default users;