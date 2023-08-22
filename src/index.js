const express = require('express');
const rotas = require('./roteador');
const app = express();
const port = 3000;

app.use(express.json());
app.use(rotas);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
