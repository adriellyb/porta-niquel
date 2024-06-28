const Despesa = require('../models/Despesa');
const LogSaldo = require('../models/LogSaldo');

/** Create new register */
const create = async (req, res) => {
    console.log("1");

    try {
        const despesa = await Despesa.create(req.body);
        calcularSaldo(req.body.user_id, req.body.valor, "sub");

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

/** Pegando o despesas de acordo com o usuário */
const despesasPorUsuario = async (req, res) => {
    console.log("6");
    const { userId } = req.params;

    try {
        const despesas = await Despesa.findAll({ 
            where: { user_id: userId },
            order: [[ "createdAt", "DESC"]]
        })
        return res.status(200).json({ despesas });
    }
    catch (err) {
        return res.status(500).json(`${err}`);
    }
}

const calcularSaldo = async (user_id, valor, op) => {
    console.log("7");

    const ultimoLog = await LogSaldo.findOne({
        where: { user_id: user_id },
        order: [['updatedAt', 'DESC' ]]
    })
    
    const saldo_anterior = ultimoLog.saldo_atual;
    
    const logData = {
        user_id: user_id,
        saldo_anterior: saldo_anterior,
        saldo_atual: op === "sub" ? saldo_anterior - valor : saldo_anterior + valor
    }
    
    try {
        const log = await LogSaldo.create(logData);
        console.log({ log: log.dataValues });
    } catch (err) {
        console.error(err.response.status);
        throw new Error(err);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    despesasPorUsuario,
};
