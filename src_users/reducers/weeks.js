
import { combineReducers } from 'redux'
import {
  FETCH_WEEKS_REQUEST,
  FETCH_WEEKS_SUCCESS,
  PROCESSED_WEEK_SUCCESS,
  PROCESSED_WEEK_CLEAN_UP
 } from '../constants'

export function weeks(state = [], { type, payload }) {
  switch (type) {
    case FETCH_WEEKS_SUCCESS:
      return payload.weeks
    
    default:
      return state
  }
}

export function processedWeek( state={},{ type,payload } ){
 switch (type) {
    case PROCESSED_WEEK_SUCCESS:
      return payload.week

    case PROCESSED_WEEK_CLEAN_UP:
      return {}
    
    default:
      return state
  }
}




