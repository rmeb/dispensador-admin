const APIURL = 'http://localhost:4000'

export function save_keystore(data) {
  return send('/keystore/ident', 'POST', data)
}

export function get_keystore(data) {
  return send('/keystore/ident', 'GET')
}

function send(path, method, body) {
  return fetch(APIURL + path, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : "{}"
  }).then(response).then(success)
}

function response(response) {
  let status = response.status
  if (status === 200 || status === 400 || status === 500) {
    return response.json()
  }
  return Promise.reject(response.statusText)
}

function success(response) {
  return response.status === 'success' ? response.data : Promise.reject(response.data)
}
