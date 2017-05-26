import { takeLatest, put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { FETCH_USERS_REQUEST } from '../constants'

import { usersActions } from '../actions'
import { usersApi } from '../api'

export function* fetchUsers(action) {
  console.log("fetching users saga..")
  debugger;
  try {
    const users = yield call(usersApi.getUsers)
    //debugger;
    yield put(usersActions.setUsers(users))
  } catch (e) {
    console.error(`${action.type} failed: ${e.message}`)
  }
}

export default {
  watchFetchUsers,
}

export function* watchFetchUsers() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers)
}
