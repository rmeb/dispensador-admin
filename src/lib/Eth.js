import {restore_keystore} from './Lightwallet'
import {signing, txutils} from 'eth-lightwallet'
const SignerProvider = require('ethjs-provider-signer');
const Eth = require('ethjs-query');

let web3;
let ks;

export function initWeb3(keystore){
    ks = restore_keystore(keystore)
    ks.signTransaction = signTransaction
    const provider = new SignerProvider('https://rinkeby.infura.io', ks);
    const eth = new Eth(provider);
    web3={ eth:eth };
}

function signTransaction(rawTx, cb) {
  console.log('signing', rawTx)
  let tx = {
    nonce: rawTx.nonce,
    gasPrice: rawTx.gasPrice,
    to: rawTx.to,
    value: rawTx.value,
    gasLimit: rawTx.gas
  }
  let signed = signing.signTx(ks, rawTx.pwDerivedKey, txutils.valueTx(tx), rawTx.from)
  console.log('signed', signed)
  cb(null, '0x' + signed)
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
  return get_derived_key(password).then(pwDerivedKey => {
    return Promise.resolve(ks.getSeed(pwDerivedKey).toString())
  })
}

function get_derived_key(password) {
  return new Promise((resolve, reject) => {
    ks.keyFromPassword(password, (e, pwDerivedKey) => {
      if (e) return reject(e)
      resolve(pwDerivedKey)
    })
  })
}

export function getWeiBalance(address) {
    return web3.eth.getBalance(address)
}

export function from_wei(wei) {
  return (parseInt(wei, 10) / 1000000000000000000)
}

export function sendTransaction(password, tx) {
  return get_derived_key(password).then(pwDerivedKey => {
    tx.pwDerivedKey = pwDerivedKey
    console.log('send', pwDerivedKey)
    return web3.eth.sendTransaction(tx)
  })
}
