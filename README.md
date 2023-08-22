![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 2 - Back-end

## Descrição do desafio

O desafio consiste em criar uma API para um Banco Digital. Esse é um projeto **piloto**, ou seja, no futuro outras funcionalidades serão implementadas, portanto, dados do banco (nome, agência, etc.) serão imutáveis.

O objetivo é construir uma RESTful API que permita:

-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

## Endpoints

### Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint lista todas as contas bancárias existentes.

-   Verifica se a senha do banco foi informada (passado como query params na url).
-   Valida se a senha do banco está correta.

-   **Requisição** - query params (respeitando este nome)
    -   senha_banco

-   **Resposta**
    -   listagem de todas as contas bancárias existentes

![image](https://github.com/daphnevilhar/desafio-backend-m02-b2bt05/assets/122536567/d9ec0537-10a5-48db-b093-fdd1f32cf322)
 

### Criar conta bancária

#### `POST` `/contas`

Esse endpoint cria uma conta bancária, gerando um número único para identificação da conta (número da conta).

-   Cria uma nova conta cujo número é único.
-   CPF deve ser um campo único.
-   E-mail deve ser um campo único.
-   Verifica se todos os campos foram informados (todos são obrigatórios).
-   Define o saldo inicial da conta como 0.

-   **Requisição** - O corpo (body) deve possuir um objeto com as seguintes propriedades (respeitando estes nomes):
  
    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

-   **Resposta**

    Em caso de **sucesso**, não teremos conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir ***status code*** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

![image](https://github.com/daphnevilhar/desafio-backend-m02-b2bt05/assets/122536567/d76874c0-1dd7-48f8-952a-e092cadf4c69)


### Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Atualiza apenas os dados do usuário de uma conta bancária.

-   Verifica se foi passado todos os campos no body da requisição.
-   Verifica se o número da conta passado como parametro na URL é válido.
-   Se o CPF for informado, verifica se já existe outro registro com o mesmo CPF.
-   Se o E-mail for informado, verifica se já existe outro registro com o mesmo E-mail.
-   Atualiza os dados do usuário de uma conta bancária.

-   **Requisição** - O corpo (body) deverá possuir um objeto com todas as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   cpf
    -   data_nascimento
    -   telefone
    -   email
    -   senha

-   **Resposta**

    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir ***status code*** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

![image](https://github.com/daphnevilhar/desafio-backend-m02-b2bt05/assets/122536567/16198a7e-bc4b-4205-aa6e-e79b1ba74944)


### Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint exclui uma conta bancária existente.

-   Verifica se o número da conta passado como parametro na URL é válido.
-   Permite excluir uma conta bancária apenas se o saldo for 0 (zero).
-   Remove a conta do objeto de persistência de dados.

-   **Requisição**

    -   Número da conta bancária (passado como parâmetro na rota)

-   **Resposta**

    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir ***status code*** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

![image](https://github.com/daphnevilhar/desafio-backend-m02-b2bt05/assets/122536567/3a12e9e3-7aca-4a15-bf8d-77a5e656f4e0)
![image](https://github.com/daphnevilhar/desafio-backend-m02-b2bt05/assets/122536567/e4055980-9f4d-4296-9723-96ba1765f1d1)


### Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint soma o valor do depósito ao saldo de uma conta válida e registrar essa transação.

-   Verifica se o número da conta e o valor do depósito foram informados no body.
-   Verifica se a conta bancária informada existe.
-   Não permite depósitos com valores negativos ou zerados.
-   Soma o valor de depósito ao saldo da conta encontrada.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor

-   **Resposta**

    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir ***status code*** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

![image](https://github.com/daphnevilhar/desafio-backend-m02-b2bt05/assets/122536567/181b4751-4d55-4692-9b95-3c6c573f1a73)

### Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint permite realizar o saque de um valor em uma determinada conta bancária e registra essa transação.

-   Verifica se o número da conta, o valor do saque e a senha foram informados no body.
-   Verifica se a conta bancária informada existe.
-   Verifica se a senha informada é uma senha válida para a conta informada.
-   Verifica se há saldo disponível para saque.
-   Subtrai o valor sacado do saldo da conta encontrada.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta
    -   valor
    -   senha

-   **Resposta**

    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir ***status code*** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

![image](https://github.com/daphnevilhar/desafio-backend-m02-b2bt05/assets/122536567/a46da0b1-77c3-468a-859e-f2f558a110eb)


### Tranferir

#### `POST` `/transacoes/transferir`

Esse endpoint permite a transferência de recursos (dinheiro) de uma conta bancária para outra e registra essa transação.

-   Verifica se o número da conta de origem, de destino, senha da conta de origem e valor da transferência foram informados no body.
-   Verifica se a conta bancária de origem informada existe.
-   Verifica se a conta bancária de destino informada existe.
-   Verifica se a senha informada é uma senha válida para a conta de origem informada.
-   Verifica se há saldo disponível na conta de origem para a transferência.
-   Subtrai o valor da transfência do saldo na conta de origem.
-   Soma o valor da transferência no saldo da conta de destino.

-   **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   numero_conta_origem
    -   numero_conta_destino
    -   valor
    -   senha

-   **Resposta**

    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir ***status code*** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

![image](https://github.com/daphnevilhar/desafio-backend-m02-b2bt05/assets/122536567/7232e41f-8209-4fa6-a94a-34c60d90cf0c)


### Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint retorna o saldo de uma conta bancária.

-   Verifica se o número da conta e a senha foram informadas (passado como query params na url).
-   Verifica se a conta bancária informada existe.
-   Verifica se a senha informada é uma senha válida.
-   Exibe o saldo da conta bancária em questão.

-   **Requisição** - query params

    -   numero_conta
    -   senha

-   **Resposta**

    -   Saldo da conta

![image](https://github.com/daphnevilhar/desafio-backend-m02-b2bt05/assets/122536567/b53692fa-9640-4d35-a6d8-3b6cadfbe766)

### Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint lista as transações realizadas de uma conta específica.

-   Verifica se o número da conta e a senha foram informadas (passado como query params na url).
-   Verifica se a conta bancária informada existe.
-   Verifica se a senha informada é uma senha válida.
-   Retorna a lista de transferências, depósitos e saques da conta em questão.

-   **Requisição** - query params

    -   numero_conta
    -   senha

-   **Resposta**
    -   Relatório da conta

![image](https://github.com/daphnevilhar/desafio-backend-m02-b2bt05/assets/122536567/aea0da9c-e672-49c1-8139-d3169cdf002f)

###### tags: `back-end` `módulo 2` `nodeJS` `API REST` `desafio`
