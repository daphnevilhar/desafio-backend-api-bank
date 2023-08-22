
const verificaCamposVazios = (req, res, next) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({
            "mensagem": "O nome é obrigatório."
        })
    }

    if (!cpf) {
        return res.status(400).json({
            "mensagem": "O cpf é obrigatório."
        })
    }

    if (!data_nascimento) {
        return res.status(400).json({
            "mensagem": "A data de nascimento é obrigatória."
        })
    }

    if (!telefone) {
        return res.status(400).json({
            "mensagem": "O telefone é obrigatório."
        })
    }

    if (!email) {
        return res.status(400).json({
            "mensagem": "O email é obrigatório."
        })
    }

    if (!senha) {
        return res.status(400).json({
            "mensagem": "A senha é obrigatória."
        })
    }

    next();
}

module.exports = {
    verificaCamposVazios,
}
