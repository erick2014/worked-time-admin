// import {
//   apiURL,
//   httpGet,
//   httpPost,
//   httpUpdate,
//   httpDelete
// } from '../utils/http'

export default {
  getUsers
}

export function getUsers() {
  let users=[
    {"name":"erick","lastName":"garcia"}
  ]
  return users;
  //return httpGet(`${apiURL}/users`)
}
