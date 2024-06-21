const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const pathToKey = path.join(__dirname, '../../', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

// Encriptando a senha
const generateHash = (password) => { 

    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64,
        'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash
    };
};

// Verificando senha
const verifyPassword = (passwordTyped, salt, hash) => {

    const hashOfTypedPassword = crypto.pbkdf2Sync(passwordTyped, salt, 10000,
        64, 'sha512').toString('hex');

    return hash === hashOfTypedPassword;
};

// Gerando JWT - achooo que isso gera a funcao getDetails
const generateJsonWebToken = (user) => {
    const payload = {
        sub: user.id,
        nome: user.nome,
        email: user.email,
        nascimento: user.nascimento,
        telefone: user.telefone ? user.telefone : null,
    }
    return jsonwebtoken.sign(payload, PRIV_KEY, {
        expiresIn: '7d', algorithm:
            'RS256'
    });
};

// Pegar token de acesso
const getToken = (req) => {
    const header = req.get('Authorization');
    if (!header) return error;

    return header.split(' ')[1];
}

//
const decodeJWT = (token) => {
    const payload = token.split(".")[1];
    const encodedPayload = Buffer.from(payload, 'base64');
    const decodedPayload = encodedPayload.toString('utf-8');

    return JSON.parse(decodedPayload);
}


module.exports = {
    generateHash,
    verifyPassword,
    generateJsonWebToken,
    getToken,
    decodeJWT
}