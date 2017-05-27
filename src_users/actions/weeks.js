import {
  FETCH_WEEKS_REQUEST,
  FETCH_WEEKS_SUCCESS,
} from '../constants'


export function fetchWeeksRequest(monthNumber) {
  return {
    type: FETCH_WEEKS_REQUEST,
    payload:{ monthNumber }
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