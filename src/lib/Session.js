const storage = window.localStorage
const KEY = 'dispensador-admin-session'

class Session {
  constructor() {
    this.keystore = storage.getItem(KEY)
  }

  new_session(keystore) {
    this.keystore = keystore
    storage.setItem(KEY, JSON.stringify(keystore))
  }

  logout() {
    storage.removeItem(KEY)
    this.keystore = null
  }

  valid() {
    return this.keystore !== null
  }
}

export default new Session()
