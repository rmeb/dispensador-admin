import {keystore} from 'eth-lightwallet'

export function create_keys(password) {
  let seedPhrase = keystore.generateRandomSeed()
  return new Promise((resolve, reject) => {
    keystore.createVault({
      password: password,
      seedPhrase: seedPhrase,
      hdPathString: "m/0'/0'/0'"
    }, function (err, ks) {
      if (err) return reject(err)
      ks.keyFromPassword(password, function (err, pwDerivedKey) {
        if (err) return reject(err);
        ks.generateNewAddress(pwDerivedKey, 1);
        resolve({
          seedPhrase,
          addresses: ks.getAddresses(),
          keystore: ks.serialize()
        })
      });
    });
  })
}

export function restore_keystore(serializedKeystore) {
  return keystore.deserialize(serializedKeystore)
}
/*
export function test(password) {
  let seedPhrase = keystore.generateRandomSeed()
  console.log('seed', seedPhrase)
  keystore.createVault({
    password: password,
    seedPhrase: seedPhrase,
    hdPathString: "m/0'/0'/0'"
  }, function (err, ks) {
    if (err) throw err
    // Some methods will require providing the `pwDerivedKey`,
    // Allowing you to only decrypt private keys on an as-needed basis.
    // You can generate that value with this convenient method:
    ks.keyFromPassword(password, function (err, pwDerivedKey) {
      if (err) throw err;
      console.log('pwDerivedKey',pwDerivedKey)
      // generate five new address/private key pairs
      // the corresponding private keys are also encrypted
      ks.generateNewAddress(pwDerivedKey, 1);
      var addr = ks.getAddresses();
      console.log('addr', addr)
      let serializedKeystore = ks.serialize()
      ks.passwordProvider = function (callback) {
        var pw = prompt("Please enter password", "Password");
        console.log('pw', pw)
        callback(null, pw);
      };

      // Now set ks as transaction_signer in the hooked web3 provider
      // and you can start using web3 using the keys/addresses in ks!
    });
  });
}
*/
