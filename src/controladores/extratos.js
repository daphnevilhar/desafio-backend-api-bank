let { contas, depositos, saques, transferencias } = require('../bancodedados.js');

const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) {
        return res.status(400).json({
            "mensagem": "O número da conta precisa ser informado."
        })
    }

    if (!senha) {
        return res.status(400).json({
            "mensagem": "A senha precisa ser informada."
        })
    }

    const conta = contas.find((usuario) => {
        return usuario.numero === numero_conta
    });

    if (!conta) {
        return res.status(400).json({
            "mensagem": "Conta bancária não encontrada."
        })
    }

    if (senha !== conta.usuario.senha) {
        return res.status(401).json({
            "mensagem": "Senha inválida."
        })
    }

    const saldoDaConta = conta.saldo

    return res.status(200).json({
        "saldo": saldoDaConta
    })
}


const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) {
        return res.status(400).json({
            "mensagem": "O número da conta precisa ser informado."
        })
    }

    if (!senha) {
        return res.status(400).json({
            "mensagem": "A senha precisa ser informada."
        })
    }

    const conta = contas.find((usuario) => {
        return usuario.numero === numero_conta
    });

    if (!conta) {
        return res.status(400).json({
            "mensagem": "Conta bancária não encontrada."
        })
    }

    if (senha !== conta.usuario.senha) {
        return res.status(401).json({
            "mensagem": "Senha inválida."
        })
    }

    const depositosDaConta = depositos.filter((depositos) => {
        return depositos.numero_conta === numero_conta
    })

    const saquesDaConta = saques.filter((saques) => {
        return saques.numero_conta === numero_conta
    })

    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta
    })

    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta
    })

    const relatorioDaConta = {
        depositos: depositosDaConta,
        saques: saquesDaConta,
        transferenciasEnviadas,
        transferenciasRecebidas,
    }

    return res.status(200).json(relatorioDaConta)
}

module.exports = {
    saldo,
    extrato
}