import {restore_keystore} from './Lightwallet'
const SignerProvider = require('ethjs-provider-signer');
const Eth = require('ethjs-query');

let web3;

export function initWeb3(keystore){
    let ks = restore_keystore(keystore)
    console.log(ks)
    const provider = new SignerProvider('https://rinkeby.infura.io', ks);
    const eth = new Eth(provider);
    eth.getAccounts = () => new Promise(r => {
      r(ks.addresses)
    })
    web3={ eth:eth };
}

export function accounts() {
    return web3.eth.getAccounts()
    /*return web3.eth.accounts((e, r) => {
      if (e) {
        return console.log(e)
      }
      return r
    })*/
}

export function getWeiBalance(address) {
    return web3.eth.getBalance(address)
}
