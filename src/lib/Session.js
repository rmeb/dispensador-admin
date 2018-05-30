import {initWeb3} from '../lib/Eth'

const storage = window.localStorage
const KEY = 'dispensador-admin-session'

/**
* Maneja el localStorage para almacenar la sesion del usuario
**/
class Session {
  constructor() {
    this.new_session(storage.getItem(KEY))
  }

  new_session(keystore) {
    this.keystore = keystore
    if (keystore !== null) {
      storage.setItem(KEY, keystore)
      console.log(keystore)
      initWeb3(keystore)
    }
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
