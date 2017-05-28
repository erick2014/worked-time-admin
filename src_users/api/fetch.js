import fetch from 'isomorphic-fetch'
const host = 'timesheet-staging-aurity.herokuapp.com'

function buildHeaders(optionalHeaders = {}) {
  return new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...optionalHeaders
  })
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const apiURL = `https://${host}/api`

export async function httpGet(url) {
  const response = await fetch(url, {method:"GET", headers: buildHeaders() })
  return await checkStatus(response).json()
}

export async function httpPut(url, data) {
  const body=JSON.stringify(data)
  const response = await fetch(url, {method: 'PUT',headers: buildHeaders(),body: body })

  return await checkStatus(response).json()
}
