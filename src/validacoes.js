const verificaDadosPessoais = async (nome, cpf, data_nascimento, telefone, email, senha) => {

    if (!nome) {
        throw { statusCode: 400, message: "O nome é obrigatório." };
    }

    if (!cpf) {
        throw { statusCode: 400, message: "O cpf é obrigatório." };
    }

    if (!data_nascimento) {
        throw { statusCode: 400, message: "A data de nascimento é obrigatória." };
    }

    if (!telefone) {
        throw { statusCode: 400, message: "O telefone é obrigatório." };
    }

    if (!email) {
        throw { statusCode: 400, message: "O email é obrigatório." };
    }

    if (!senha) {
        throw { statusCode: 400, message: "A senha é obrigatória." };
    }
};

const validaConta = async (contas, numero_conta) => {
    if (!numero_conta) {
        throw { statusCode: 400, message: "Informar o número da conta é obrigatório." };
    }

    const conta = contas.find((usuario) => {
        return usuario.numero === numero_conta;
    });

    if (!conta) {
        throw { statusCode: 404, message: "Usuario não encontrado." };
    }

    return conta;
};

const validaSenha = async (conta, senha) => {
    if (!senha) {
        throw { statusCode: 400, message: "Informar a senha é obrigatório." };
    }
    if (senha !== conta.usuario.senha) {
        throw { statusCode: 401, message: "Senha inválida." };
    }
};

const verificaCpfEmail = async (contas, cpf, email) => {

    const cpfJaExiste = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    })

    const emailJaExiste = contas.find((conta) => {
        return conta.usuario.email === email
    })

    if (cpfJaExiste) {
        throw { statusCode: 400, message: "O CPF informado já existe cadastrado." };
    }


    if (emailJaExiste) {
        throw { statusCode: 400, message: "O email informado já existe cadastrado." };
    }
};

const validaValores = async (valor) => {

    if (!valor) {
        throw { statusCode: 400, message: "Informar o valor é obrigatório." }
    }

    if (valor <= 0) {
        throw { statusCode: 403, message: "Não são permitidos depósitos com valores zerados ou negativos." };
    }
}

module.exports = {
    verificaDadosPessoais,
    validaConta,
    validaSenha,
    verificaCpfEmail,
    validaValores
};
