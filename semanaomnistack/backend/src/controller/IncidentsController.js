const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        const { title, description, value } = request.body;

        // pegando informações do header da requisição
        const ong_id = request.headers.authorization;

        // a variavel id está armazenando o valor id da primeira posição do array de resposta da inserção.
        // como o resultado da inserção tem apenas um elemento de resposta, podemos acessar a propriedade id diretamente
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id })
    },

    async index(request, response) {

        //busca o valor 'page' dentre os queryParameters. Se não encontrar esse valor, atribui o valor default 1 para 'page'
        const { page = 1 } = request.query;

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city');

        response.header('X-Total-Count', incidents.length);
        return response.json(incidents);
    },

    async get(request, response) {
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')

        return response.json(incidents);
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({error: 'Operation Not Permitted!'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }

};