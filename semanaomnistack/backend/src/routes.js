// importando funcionalidades do express e armazenando na variável 'express'
const express = require('express');
const ongController = require('./controller/OngController'); 
const incidentsController = require('./controller/IncidentsController');
const sessionController = require('./controller/SessionController');

// externalizando as propriedades e configs de Rotas do Express na variável routes
const routes = express.Router();

/* Indica para o meu routes que o Express deve converter TODAS as rotas para o formato JSON
    É importante que esse código seja colocado antes das rotas para que o app entenda que todas as rotas devem ter essa configuração
*/
routes.use(express.json());

// indicando para aplicação que o / será a raiz da aplicação com método GET
routes.get('/', (request, response) => {
    return response.send('Hello World');
});

// indicando para aplicação que a rota /user é um método GET
routes.get('/users', (request, response) => {
    return response.json({
        evento: 'Semana OmniStack',
        aluno: 'Igor Mendonça'
    });
});

/**
 * O ":id" é uma parametro de rota. Quando eu for chamar a rota para passando um parametro, o node vai casar o que eu passar com a variável id
 * Ex: /users/1
 */
routes.post('/users/:id', (request, response) => {
    // Armazena na variável query_parameters todos os queryParameters do request
    const query_parameters = request.query;

    // Armazena na variável route_parameters os RouteParameters, exemplo: { id: 1}
    const route_parameters = request.params;

    // Armazena na variável body_parameters o Body da requisição
    const body_parameters = request.body;

    return response.json({
        evento: 'Semana OmniStack',
        aluno: 'Igor Mendonça'
    });
});

// Método de listagem de ongs onde abstraímos a lógica de busca de ongs para dentro do OngController
routes.get('/ongs', ongController.index);

// Método de criação de ongs onde abstraímos a lógica de criação de ongs para dentro do OngController
routes.post('/ongs', ongController.create);

routes.post('/incidents', incidentsController.create);
routes.get('/incidents', incidentsController.index);
routes.delete('/incidents/:id', incidentsController.delete);
routes.get('/incidents/ong', incidentsController.get);

routes.post('/sessions', sessionController.create);

// Estou exportando as propriedades da variável routes, ou seja, quem usar as propriedades consiguirá usar todas as rotas configuradas na variável
module.exports = routes;