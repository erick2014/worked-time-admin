import {
  apiURL,
  httpGet,
} from './fetch'

export function getUsers() {
  return httpGet(`${apiURL}/users`)
}

export function getWeeks(monthNumber) {
  return httpGet(`${apiURL}/training/weeks/${monthNumber}/2017/3`)
}

export default {
  getUsers,
  getWeeks
}