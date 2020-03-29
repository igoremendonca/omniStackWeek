// importando funcionalidades do express e armazenando na variável 'express'
const express = require('express');

// importando as propriedades do arquivo "routes.js".
// Sempre lembrar de usar o '/.' para indicar que estamos importando propriedades de um arquivo JS e não um módulo como acontece com o 'express'
const routes = require('./routes');

// importando funcionalidades do cors e armazenando na variável 'cors'
const cors = require('cors');

// dizendo que a aplicação será do tipo express
// a variável app a partir de agora vai representar a minha aplicação
const app = express();

/* Indica para o meu app que o Express deve converter TODAS as rotas para o formato JSON
    É importante que esse código seja colocado antes das rotas para que o app entenda que todas as rotas devem ter essa configuração
*/
app.use(express.json());

// Indica que o nosso app que as configurações do routes estão ativas
app.use(routes);

// Indica que o nosso app que as configurações do Cors estão ativas
app.use(cors());

// // indicando para aplicação que o / será a raiz da aplicação com método GET
// app.post('/users', (request, response) => {
//     return response.json({
//         evento: 'Semana OmniStack',
//         aluno: 'Igor Mendonça'
//     });
// });

// /**
//  * O ":id" é uma parametro de rota. Quando eu for chamar a rota para passando um parametro, o node vai casar o que eu passar com a variável id
//  * Ex: /users/1
//  */
// app.post('/users/:id', (request, response) => {
//     // Armazena na variável query_parameters todos os queryParameters do request
//     const query_parameters = request.query;

//     // Armazena na variável route_parameters os RouteParameters, exemplo: { id: 1}
//     const route_parameters = request.params;

//     // Armazena na variável body_parameters o Body da requisição
//     const body_parameters = request.body;

//     return response.json({
//         evento: 'Semana OmniStack',
//         aluno: 'Igor Mendonça'
//     });
// });

// dizendo para a aplicação ouvir a porta 3333
app.listen(3333);