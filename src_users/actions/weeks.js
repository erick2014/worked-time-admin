import {
  FETCH_WEEKS_REQUEST,
  FETCH_WEEKS_SUCCESS,
} from '../constants'


export function fetchWeeksRequest(monthNumber,userId) {
  return {
    type: FETCH_WEEKS_REQUEST,
    payload:{ monthNumber,userId }
  }
}

export function setWeeks(weeks) {
  return {
    type: FETCH_WEEKS_SUCCESS,
    payload: { weeks }
  }
}

export default { 
  fetchWeeksRequest ,
  setWeeks,
}