const LogSaldo = require('../models/LogSaldo');
const Saldo = require('../models/Saldo');

/** Create new register */
const create = async (req, res) => {
    console.log("1");
    try {
        const saldo = await Saldo.create(req.body);
        criarLogSaldo(req.body.user_id)

        return res.status(200).json({ message: "Saldo registrado com sucesso!", saldo: saldo });
    }
    catch (err) {
        return res.status(500).json(`${err}`);
    }
}

/** List all registers */
const index = async (req, res) => {
    console.log("2");
    try {
        const saldos = await Saldo.findAll();
        return res.status(200).json({ saldos });
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
        const saldo = await Saldo.findByPk(id);
        return res.status(200).json({ saldo });
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

        const [updated] = await Saldo.update(req.body, {
            where: { id: id }
        });

        if (updated) {
            const saldo = await Saldo.findByPk(id);
            return res.status(200).send(saldo);
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
        const deleted = await Saldo.destroy({ where: { id } });

        if (deleted) {
            return res.status(200).json("Registro deletado com sucesso.");
        }

        throw new Error("Registro não encontrado.");
    } catch (err) {
        return res.status(500).json(`${err}`);
    }
};


const criarLogSaldo = async (user_id) => {
    console.log("6");
    const saldo_atual = await Saldo.findOne({
        where: { user_id: user_id },
        order: [['updatedAt', 'DESC' ]]
    })

    const ultimoLog = await LogSaldo.findOne({
        where: { user_id: user_id },
        order: [['updatedAt', 'DESC' ]]
    })
    
    const saldo_anterior = ultimoLog ? ultimoLog.saldo_atual : 0.00;
    
    const logData = {
        user_id: user_id,
        saldo_anterior: saldo_anterior,
        saldo_atual: saldo_atual.valor
    }
    
    try {
        const log = await LogSaldo.create(logData);
        console.log({ log: log.dataValues });
    } catch (err) {
        console.error(err.response.status);
        throw new Error(err);
    }
}

/** Pegando o saldo de acordo com o usuário */
const saldoPorUsuario = async (req, res) => {
    console.log("7");
    const { userId } = req.params;

    try {
        const saldo = await LogSaldo.findOne({ 
            where: { user_id: userId },
            order: [['updatedAt', 'DESC' ]] 
        })
        return res.status(200).json({ saldo });
    }
    catch (err) {
        return res.status(500).json(`${err}`);
    }

}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    saldoPorUsuario,
};
