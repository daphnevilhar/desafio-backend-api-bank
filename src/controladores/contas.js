const { banco } = require('../bancodedados.js');
let { contas, numeroConta } = require('../bancodedados.js');

const listarContas = (req, res) => {
    const { senha_banco } = req.query;

    if (senha_banco) {

        if (senha_banco === banco.senha) {
            return res.status(200).json(contas)
        }

        return res.status(403).json({
            "mensagem": "A senha do banco informada é inválida!"
        })
    }

    return res.status(400).json({
        "mensagem": "A senha do banco precisa ser informada."
    })
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const cpfUnico = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    })

    const emailUnico = contas.find((conta) => {
        return conta.usuario.email === email
    })

    if (cpfUnico || emailUnico) {
        return res.status(400).json({
            "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
        })
    }

    const conta = numeroConta.toString();

    const novaConta = {
        numero: conta,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(novaConta);
    numeroConta++

    return res.status(201).json({
        "mensagem": "Nova conta criada com sucesso!"
    })
}

const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    const conta = contas.find((usuario) => {
        return usuario.numero === numeroConta
    });

    if (!conta) {
        return res.status(400).json({
            "mensagem": "Usuario não encontrado."
        })
    }

    const cpfJaExiste = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    })

    const emailJaExiste = contas.find((conta) => {
        return conta.usuario.email === email
    })

    if (cpfJaExiste) {
        return res.status(400).json({
            "mensagem": "O CPF informado já existe cadastrado."
        })
    }

    if (emailJaExiste) {
        return res.status(400).json({
            "mensagem": "O email informado já existe cadastrado."
        })
    }

    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    return res.status(203).send();
};

const deletarUsuario = (req, res) => {
    const { numeroConta } = req.params;

    const conta = contas.find((usuario) => {
        return usuario.numero === numeroConta
    });

    if (!conta) {
        return res.status(404).json({
            "mensagem": "Usuario não encontrado."
        })
    }

    if (conta.saldo !== 0) {
        return res.status(400).json({
            "mensagem": "A conta só pode ser removida se o saldo for zero!"
        })
    }

    contas = contas.filter((conta) => {
        return conta.numero !== numeroConta
    })

    return res.status(204).send();
}

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    deletarUsuario
}