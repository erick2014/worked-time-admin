import {
  apiURL,
  httpGet,
  httpPut
} from './fetch'

export function getUsers() {
  return httpGet(`${apiURL}/users`)
}

export function getWeeks(monthNumber,userId,year) {
  return httpGet(`${apiURL}/training/weeks/${monthNumber}/${year}/${userId}`)
}

export function processWeek( weekId,approverId,status ){
  return httpPut(`${apiURL}/training/weeks/${weekId}/users/${approverId}`,{"status":status})
}

export default {
  getUsers,
  getWeeks,
  processWeek
}