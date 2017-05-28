import {
  apiURL,
  httpGet,
  httpPut
} from './fetch'

export function getUsers() {
  return httpGet(`${apiURL}/users`)
}

export function getWeeks(monthNumber,userId) {
  return httpGet(`${apiURL}/training/weeks/${monthNumber}/2017/${userId}`)
}

export function approveWeek( weekId,approverId,status ){
  debugger;
  return httpPut(`${apiURL}/training/weeks/${weekId}/users/${approverId}`,{"status":status})
}

export default {
  getUsers,
  getWeeks,
  approveWeek
}