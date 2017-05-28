import {
  apiURL,
  httpGet,
} from './fetch'

export function getUsers() {
  return httpGet(`${apiURL}/users`)
}

export function getWeeks(monthNumber,userId) {
  return httpGet(`${apiURL}/training/weeks/${monthNumber}/2017/${userId}`)
}

export default {
  getUsers,
  getWeeks
}