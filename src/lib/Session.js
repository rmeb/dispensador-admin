import {initWeb3} from '../lib/Eth'

const storage = window.localStorage
const KEY = 'dispensador-admin-session'

/**
* Maneja el localStorage para almacenar la sesion del usuario
**/
class Session {
  constructor() {
    this.data = JSON.parse(storage.getItem(KEY))
    if (this.data !== null) {
      initWeb3(this.data.keystore)
    }
  }

  new_session(keystore, rut) {
    this.data = {rut, keystore}
    storage.setItem(KEY, JSON.stringify(this.data))
    initWeb3(keystore)
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
