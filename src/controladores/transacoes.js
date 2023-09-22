let { contas, depositos, saques, transferencias } = require('../bancodedados.js');
const { validaConta, validaSenha, validaValores } = require('../validacoes');
const { format } = require('date-fns');

const depositar = async (req, res) => {
    const { numero_conta, valor } = req.body;

    try {
        const conta = await validaConta(contas, numero_conta);

        await validaValores(valor);

        conta.saldo += valor;

        const registro = {
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta,
            valor
        };

        depositos.push(registro);

        return res.status(204).send();

    } catch (error) {
        return res.status(error.statusCode).json({
            "mensagem": error.message
        });
    }
};

const sacar = async (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    try {
        const conta = await validaConta(contas, numero_conta);

        await validaSenha(conta, senha);

        await validaValores(valor);

        if (valor > conta.saldo) {
            throw { statusCode: 403, message: "Saldo insuficiente!" };
        }

        conta.saldo -= valor;

        const registro = {
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta,
            valor
        };

        saques.push(registro);

        return res.status(204).send();

    } catch (error) {
        return res.status(error.statusCode).json({
            "mensagem": error.message
        });
    }
};

const transferir = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    try {

        if (!numero_conta_origem) {
            throw { statusCode: 400, message: "Número da conta de origem é obrigatório." };
        }

        if (!numero_conta_destino) {
            throw { statusCode: 400, message: "Número da conta de destino é obrigatório." }
        }

        let contaOrigem = contas.find((usuario) => {
            return usuario.numero === numero_conta_origem.toString();
        });

        let contaDestino = contas.find((usuario) => {
            return usuario.numero === numero_conta_destino.toString();
        });

        if (!contaOrigem) {
            throw { statusCode: 404, message: "A conta de origem não foi encontrada." };
        }

        if (!contaDestino) {
            throw { statusCode: 404, message: "A conta de destino não foi encontrada." };
        }

        await validaSenha(contaOrigem, senha);

        await validaValores(valor);

        if (valor > contaOrigem.saldo) {
            throw { statusCode: 403, message: "Saldo insuficiente." };
        }

        contaOrigem.saldo -= valor;
        contaDestino.saldo += valor;

        const registro = {
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta_origem,
            numero_conta_destino,
            valor
        };

        transferencias.push(registro);

        return res.status(204).send();

    } catch (error) {
        return res.status(error.statusCode).json({
            "mensagem": error.message
        });
    }
}

module.exports = {
    depositar,
    sacar,
    transferir
}
