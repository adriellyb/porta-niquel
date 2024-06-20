const Despesa = require('../models/Despesa');

/** Create new register */
const create = async (req, res) => {
    console.log("1");

    req.body.user_id = 1;
    try {
        const despesa = await Despesa.create(req.body);
        return res.status(200).json({ message: "Despesa registrada com sucesso!", despesa: despesa });
    }
    catch (err) {
        return res.status(500).json(`${err}`);
    }
}

/** List all registers */
const index = async (req, res) => {
    console.log("2");
    try {
        const despesas = await Despesa.findAll();
        return res.status(200).json({ despesas });
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
        const despesa = await Despesa.findByPk(id);
        return res.status(200).json({ despesa });
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

        const [updated] = await Despesa.update(req.body, {
            where: { id: id }
        });

        if (updated) {
            const despesa = await Despesa.findByPk(id);
            return res.status(200).send(despesa);
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
        const deleted = await Despesa.destroy({ where: { id } });

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
