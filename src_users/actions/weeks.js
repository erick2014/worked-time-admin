import {
  FETCH_WEEKS_REQUEST,
  FETCH_WEEKS_SUCCESS,
  APPROVE_WEEK_REQUEST,
  APPROVE_WEEK_SUCCESS,
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

export function approveWeekRequest(weekId,approverId,status){
  return {
    type: APPROVE_WEEK_REQUEST,
    payload: { weekId,approverId,status }
  }
}

export function setApproveWeekResponse( response ) {
  return {
    type: APPROVE_WEEK_SUCCESS,
    payload: { response }
  }
}



export default { 
  fetchWeeksRequest,
  setWeeks,
  approveWeekRequest,
  setApproveWeekResponse
}