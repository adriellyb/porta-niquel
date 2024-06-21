const crypto = require('crypto');
const fs = require('fs');

(() => {
    
    // Gera um objeto onde as chaves são armazenadas nas propriedades `privateKey` e` publicKey`
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // bits - tamanho padrão para chaves RSA
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Formato comum para chaves RSA
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });
    
    fs.writeFileSync(__dirname + '/../../id_rsa_pub.pem', keyPair.publicKey);
    fs.writeFileSync(__dirname + '/../../id_rsa_priv.pem', keyPair.privateKey);

})();
