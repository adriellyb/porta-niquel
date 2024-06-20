const User = require('../models/User');

/** Create new register */
const create = async (req, res) => {
    console.log("1");
    try {
        const user = await User.create(req.body);
        return res.status(200).json({ message: "Usuário registrado com sucesso!", user: user });
    }
    catch (err) {
        return res.status(500).json(`${err}`);
    }
}

/** List all registers */
const index = async (req, res) => {
    console.log("2");
    try {
        const users = await User.findAll();
        return res.status(200).json({ users });
    }
    catch (err) {
        return res.status(500).json(`${err}`);
    }
}

/** Find a register by id */
const show = async (req, res) => {
    console.log("3");
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(500).json(`${err}`);
    }
}

/** Update register data */
const update = async (req, res) => {
    console.log("4");
    try {
        const { id } = req.params;

        const [updated] = await User.update(req.body, {
            where: { id: id }
        });

        if (updated) {
            const user = await User.findByPk(id);
            return res.status(200).send(user);
        }

        throw new Error('Registro não encontrado.');
    } catch (err) {
        return res.status(500).json(`${err}`);
    }
};

/** Delete a register */
const destroy = async (req, res) => {
    console.log("5");
    const { id } = req.params;
    try {
        const deleted = await User.destroy({ where: { id } });

        if (deleted) {
            return res.status(200).json("Registro deletado com sucesso.");
        }

        throw new Error("Registro não encontrado.");
    } catch (err) {
        return res.status(500).json(`${err}`);
    }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy
};
