import { takeLatest, put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { FETCH_WEEKS_REQUEST,PROCESSED_WEEK_REQUEST } from '../constants'

import { weeksActions } from '../actions'
import { api } from '../api'

export function* fetchWeeks(action) {
  try {
    
    const { monthNumber,userId }=action.payload;

    let weeks={};

    const weeksFromServer = yield call( api.getWeeks,monthNumber,userId )
    //validate response data
    if( weeksFromServer && weeksFromServer.data ) weeks=weeksFromServer.data;
    
    if( weeks.weeks instanceof Array ){
      
      let newWeeksList=[];
      weeks=weeks.weeks;

      for( var i=0;i<weeks.length;i++ ){
        let week=weeks[i];
        let weeksInDay=[];

        for( var j=0;j<week.days_in_week.length;j++ ){
          weeksInDay.push( week["days_in_week"][j]["day_number"] )
        }

        let weekObj={ "week_number":week["week_number"] ,"week_id":week["week_id"],"days_in_week":weeksInDay }
        newWeeksList.push( weekObj )
        
      }
      //sent data to redux
      yield put( weeksActions.setWeeks(newWeeksList) )
    }
    else{
       //sent data to redux
    yield put( weeksActions.setWeeks(weeks) )
    }

   
    
  } catch (e) {
    console.error(`${action.type} failed: ${e.message}`)
  }
}


export function* processedWeek(action) {
  try {
    const { weekId,approverId,status }=action.payload;
    //sent data to the server
    const response = yield call( api.processWeek, weekId, approverId , status );
    //sent response data to redux
    yield put( weeksActions.processWeekResponse(response) );
    
  } catch (e) {
    console.error(`${action.type} failed: ${e.message}`)
  }
}


export function* watchProcessedWeek() {
  yield takeLatest(PROCESSED_WEEK_REQUEST, processedWeek)
}

export function* watchFetchWeeks() {
  yield takeLatest(FETCH_WEEKS_REQUEST, fetchWeeks)
}


export default {
  watchFetchWeeks,
  watchProcessedWeek
}