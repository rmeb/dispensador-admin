import {restore_keystore} from './Lightwallet'
const SignerProvider = require('ethjs-provider-signer');
const Eth = require('ethjs-query');

let web3;
let ks;

export function initWeb3(keystore){
    ks = restore_keystore(keystore)
    const provider = new SignerProvider('https://rinkeby.infura.io', ks);
    const eth = new Eth(provider);
    web3={ eth:eth };
}

export function get_accounts() {
    return ks.addresses
    /*return web3.eth.accounts((e, r) => {
      if (e) {
        return console.log(e)
      }
      return r
    })*/
}

export function get_seed_words(password) {
  return new Promise((resolve, reject) => {
    ks.keyFromPassword(password, (e, pwDerivedKey) => {
      if (e) return reject(e)
      resolve(ks.getSeed(pwDerivedKey).toString())
    })
  })
}

export function getWeiBalance(address) {
    return web3.eth.getBalance(address)
}

export function from_wei(wei) {
  return Math.floor(wei / 1000000000000000000)
}
