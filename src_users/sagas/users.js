import { takeLatest, put, call } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { FETCH_USERS_REQUEST } from '../constants'

import { usersActions } from '../actions'
import { api } from '../api'

export function* fetchUsers(action) {
  try {
    const users = yield call(api.getUsers)
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
