import {initWeb3} from '../lib/Eth'

const storage = window.localStorage
const KEY = 'dispensador-admin-session'

/**
* Maneja el localStorage para almacenar la sesion del usuario
**/
class Session {
  constructor() {
    this.data = null
    this.new_session(storage.getItem(KEY))
  }

  new_session(keystore, rut) {
    if (keystore !== null) {
      this.data = {
        rut,
        keystore
      }
      storage.setItem(KEY, this.data)
      initWeb3(keystore)
    }
  }

  logout() {
    storage.removeItem(KEY)
    this.data = null
  }

  valid() {
    return this.data !== null
  }

  get_data() {
    return this.data
  }
}

export default new Session()
