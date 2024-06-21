const Auth = require('../config/auth');
const User = require('../models/User');
const UserController = require('../controllers/UserController');

const login = async (req, res) => {

    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        const isValid = Auth.verifyPassword(req.body.senha,
            user.dataValues.salt, user.dataValues.hash);

        if (isValid) {
            const token = Auth.generateJsonWebToken(user);
            res.status(200).json({
                message: "Usuário logado com sucesso.",
                token: token
            });
        }
        else {
            res.status(401).json({
                message: "Você entrou com a senha incorreta."
            });
        }
    } catch (err) {
        res.status(401).json({ message: "Esse usuário não existe." });
    }
};

const getDetails = async (req, res) => {
    try {
        const token = Auth.getToken(req);
        const payload = Auth.decodeJWT(token);
        const userResponse = await User.findByPk(payload.sub);

        if (!userResponse) { 
            return res.status(404).json({ message: 'Usuario não encontrado.' }); 
        }
        const user = {
            sub: userResponse.id,
            nome: userResponse.nome,
            email: userResponse.email,
            nascimento: userResponse.nascimento,
            telefone: userResponse.telefone,
        }
        return res.status(200).json({ user });

    } catch (e) {
        return res.status(500).json({ err: e });
    }
};

module.exports = {
    login,
    getDetails,
};