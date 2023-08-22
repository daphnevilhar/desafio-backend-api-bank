let { contas, depositos, saques, transferencias } = require('../bancodedados.js');
const { format } = require('date-fns');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        return res.status(400).json({
            "mensagem": "Informar o número da conta é obrigatório."
        })
    }

    if (!valor) {
        return res.status(400).json({
            "mensagem": "Informar o valor é obrigatório."
        })
    }

    const conta = contas.find((usuario) => {
        return usuario.numero === numero_conta
    });

    if (!conta) {
        return res.status(404).json({
            "mensagem": "Usuario não encontrado."
        })
    }

    if (valor <= 0) {
        return res.status(400).json({
            "mensagem": "Não são permitido depósitos com valores zerados ou negativos."
        })
    }

    conta.saldo += valor;

    const registro = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta,
        valor
    }

    depositos.push(registro);

    return res.status(204).send();
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) {
        return res.status(400).json({
            "mensagem": "Informar o número da conta é obrigatório."
        })
    }

    if (!valor) {
        return res.status(400).json({
            "mensagem": "Informar o valor é obrigatório."
        })
    }

    if (!senha) {
        return res.status(400).json({
            "mensagem": "Informar a senha é obrigatório."
        })
    }

    const conta = contas.find((usuario) => {
        return usuario.numero === numero_conta
    });

    if (!conta) {
        return res.status(404).json({
            "mensagem": "Usuario não encontrado."
        })
    }

    if (senha !== conta.usuario.senha) {
        return res.status(401).json({
            "mensagem": "Senha inválida."
        })
    }

    if (valor > conta.saldo) {
        return res.status(400).json({
            "mensagem": "Saldo insuficiente."
        })
    }

    conta.saldo -= valor;

    const registro = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta,
        valor
    }

    saques.push(registro);

    return res.status(204).send();
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem) {
        return res.status(400).json({
            "mensagem": "Informar o número da conta de origem é obrigatório."
        })
    }

    if (!numero_conta_destino) {
        return res.status(400).json({
            "mensagem": "Informar o número da conta de destino é obrigatório."
        })
    }

    if (!valor) {
        return res.status(400).json({
            "mensagem": "Informar o valor é obrigatório."
        })
    }

    if (!senha) {
        return res.status(400).json({
            "mensagem": "Informar a senha é obrigatório."
        })
    }

    let contaOrigem = contas.find((usuario) => {
        return usuario.numero === numero_conta_origem
    });

    let contaDestino = contas.find((usuario) => {
        return usuario.numero === numero_conta_destino
    });

    if (!contaOrigem) {
        return res.status(404).json({
            "mensagem": "A conta de origem não foi encontrada."
        })
    }

    if (!contaDestino) {
        return res.status(404).json({
            "mensagem": "A conta de destino não foi encontrada."
        })
    }

    if (senha !== contaOrigem.usuario.senha) {
        return res.status(401).json({
            "mensagem": "Senha inválida."
        })
    }

    if (valor > contaOrigem.saldo) {
        return res.status(400).json({
            "mensagem": "Saldo insuficiente."
        })
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const registro = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(registro);

    return res.status(204).send();
}

module.exports = {
    depositar,
    sacar,
    transferir
}