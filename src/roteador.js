const express = require('express');
const { listarContas, criarConta, atualizarUsuario, deletarUsuario } = require('./controladores/contas');
const { depositar, sacar, transferir } = require('./controladores/transacoes');
const { saldo, extrato } = require('./controladores/extratos');
const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', deletarUsuario);
rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', sacar);
rotas.post('/transacoes/transferir', transferir);
rotas.get('/contas/saldo', saldo);
rotas.get('/contas/extrato', extrato);

module.exports = rotas;
