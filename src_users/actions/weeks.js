import {
  FETCH_WEEKS_REQUEST,
  FETCH_WEEKS_SUCCESS,
  PROCESSED_WEEK_REQUEST,
  PROCESSED_WEEK_SUCCESS,
  PROCESSED_WEEK_CLEAN_UP,
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

export function processWeekRequest(weekId,approverId,status){
  return {
    type: PROCESSED_WEEK_REQUEST,
    payload: { weekId,approverId,status }
  }
}

export function processWeekResponse( week ) {
  return {
    type: PROCESSED_WEEK_SUCCESS,
    payload: { week }
  }
}

export function cleanUpProcessedWeek(  ) {
  return {
    type: PROCESSED_WEEK_CLEAN_UP,
  }
}


export default { 
  fetchWeeksRequest,
  setWeeks,
  processWeekRequest,
  processWeekResponse,
  cleanUpProcessedWeek
}