const { banco } = require('../bancodedados.js');
const { verificaDadosPessoais, verificaCpfEmail, validaConta } = require('../validacoes.js');
let { contas, numeroConta } = require('../bancodedados.js');

const listarContas = async (req, res) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({
            "mensagem": "A senha do banco precisa ser informada."
        });
    }

    if (senha_banco !== banco.senha) {
        return res.status(401).json({
            "mensagem": "A senha do banco informada é inválida!"
        });
    }

    return res.status(200).json(contas);

};

const criarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    try {

        await verificaDadosPessoais(nome, cpf, data_nascimento, telefone, email, senha);

        await verificaCpfEmail(contas, cpf, email);

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
        };

        contas.push(novaConta);
        numeroConta++;

        return res.status(201).send();

    } catch (error) {
        return res.status(error.statusCode).json({
            "mensagem": error.message
        });
    }
};

const atualizarUsuario = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    try {
        await verificaDadosPessoais(nome, cpf, data_nascimento, telefone, email, senha);

        const conta = await validaConta(contas, numeroConta);

        await verificaCpfEmail(contas, cpf, email);

        conta.usuario.nome = nome;
        conta.usuario.cpf = cpf;
        conta.usuario.data_nascimento = data_nascimento;
        conta.usuario.telefone = telefone;
        conta.usuario.email = email;
        conta.usuario.senha = senha;

        return res.status(204).send();

    } catch (error) {
        return res.status(error.statusCode).json({
            "mensagem": error.message
        });
    }
};

const deletarUsuario = async (req, res) => {
    const { numeroConta } = req.params;

    try {

        const conta = await validaConta(contas, numeroConta);

        if (conta.saldo !== 0) {
            throw { statusCode: 400, message: "A conta só pode ser removida se o saldo for zero!" };
        }

        contas = contas.filter((conta) => {
            return conta.numero !== numeroConta;
        });

        return res.status(204).send();

    } catch (error) {
        return res.status(error.statusCode).json({
            "mensagem": error.message
        });
    }
};

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    deletarUsuario
};
