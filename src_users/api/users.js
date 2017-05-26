import {
  apiURL,
  httpGet,
} from './fetch'

export function getUsers() {
  return httpGet(`${apiURL}/users`)
}

export default {
  getUsers
}