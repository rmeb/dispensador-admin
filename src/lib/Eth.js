import {restore_keystore} from './Lightwallet'
const SignerProvider = require('ethjs-provider-signer');
const Eth = require('ethjs-query');

let web3;

export function initWeb3(keystore){
  console.log(keystore)
    const provider = new SignerProvider('https://rinkeby.infura.io', restore_keystore(keystore));
    const eth = new Eth(provider);
    web3={ eth:eth };
}

export function accounts() {
    return web3.eth.getAccounts((e, r) => {
        if (e) {
            return console.log(e)
        }
        return r
    })
}

export function getWeiBalance(address) {
    return web3.eth.getBalance(address)
}
