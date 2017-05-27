import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS
} from '../constants'


export function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST
  }
}

export function setUsers(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: {
      users
    }
  }
}

export default { 
  fetchUsersRequest ,
  setUsers,
}