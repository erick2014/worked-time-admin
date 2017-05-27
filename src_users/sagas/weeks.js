import { takeLatest, put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { FETCH_WEEKS_REQUEST } from '../constants'

import { weeksActions } from '../actions'
import { api } from '../api'

export function* fetchWeeks(action) {
  try {
    console.log("fetching weeks");
    let weeks={};
    const weeksFromServer = yield call( api.getWeeks,action.payload.monthNumber )
    //validate response data
    if( weeksFromServer && weeksFromServer.data ) weeks=weeksFromServer.data;
    //sent data to redux
    yield put( weeksActions.setWeeks(weeks) )
    
  } catch (e) {
    console.error(`${action.type} failed: ${e.message}`)
  }
}

export function* watchFetchWeeks() {
  yield takeLatest(FETCH_WEEKS_REQUEST, fetchWeeks)
}

export default {
  watchFetchWeeks
}