let { contas, depositos, saques, transferencias } = require('../bancodedados.js');
const { validaConta, validaSenha } = require('../validacoes.js');

const saldo = async (req, res) => {
    const { numero_conta, senha } = req.query;

    try {
        const conta = await validaConta(contas, numero_conta);

        await validaSenha(conta, senha);

        const saldoDaConta = conta.saldo;

        return res.status(200).json({
            "saldo": saldoDaConta
        });

    } catch (error) {
        return res.status(error.statusCode).json({
            "mensagem": error.message
        });
    }
};

const extrato = async (req, res) => {
    const { numero_conta, senha } = req.query;

    try {
        const conta = await validaConta(contas, numero_conta);

        await validaSenha(conta, senha);

        const depositosDaConta = depositos.filter((deposito) => {
            return deposito.numero_conta === numero_conta;
        });

        const saquesDaConta = saques.filter((saque) => {
            return saque.numero_conta === numero_conta;
        });

        const transferenciasEnviadas = transferencias.filter((transferencia) => {
            return transferencia.numero_conta_origem === numero_conta;
        });

        const transferenciasRecebidas = transferencias.filter((transferencia) => {
            return transferencia.numero_conta_destino === numero_conta;
        });

        const relatorioDaConta = {
            depositos: depositosDaConta,
            saques: saquesDaConta,
            transferenciasEnviadas,
            transferenciasRecebidas,
        };

        return res.status(200).json(relatorioDaConta);

    } catch (error) {
        return res.status(error.statusCode).json({
            "mensagem": error.message
        });
    }
};

module.exports = {
    saldo,
    extrato
};
