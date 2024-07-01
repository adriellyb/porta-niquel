const Despesa = require('../models/Despesa');
const LogSaldo = require('../models/LogSaldo');

/** Create new register */
const create = async (req, res) => {
    console.log("1");
    try {
        req.body.deletado = 0; // soft delete
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
            where: { user_id: userId, deletado: 0 },
            order: [[ "data_pag", "DESC"]]
        })
        return res.status(200).json({ despesas });
    }
    catch (err) {
        return res.status(500).json(`${err}`);
    }
}

/** Aplicando um soft delete na despesa selecionada */
const softDelete = async(req, res) => {
    console.log("7");
    try {
        const { id } = req.params;
        req.body.deletado = 1;
        
        const [updated] = await Despesa.update(req.body, {
            where: { id: id }
        });
        
        if (updated) {
            const despesa = await Despesa.findByPk(id);
            calcularSaldo(despesa.user_id, despesa.valor, "add");
            
            return res.status(200).json({message: "Despesa deletada."});
        }
        throw new Error('Registro não encontrado.');
    } catch (err) {
        return res.status(500).json(`${err}`);
    }
}

/** Calculando saldo de acordo as operações de subtração ou adição de despesas */
const calcularSaldo = async (user_id, valor, op) => {
    console.log("8");

    const ultimoLog = await LogSaldo.findOne({
        where: { user_id: user_id },
        order: [['updatedAt', 'DESC' ]]
    })
    
    const saldo_anterior = ultimoLog.saldo_atual;
    const saldo_calculado = op === "sub" ? saldo_anterior - valor : saldo_anterior + valor;
    
    const logData = {
        user_id: user_id,
        saldo_anterior: saldo_anterior,
        saldo_atual: saldo_calculado,
        aumentou: saldo_calculado >= saldo_anterior ? 1 : 0
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
    softDelete
};
