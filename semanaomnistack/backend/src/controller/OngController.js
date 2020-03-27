const crypto = require('crypto');  
const connection = require('../database/connection');

module.exports = {
    // Método assincrono que lista todas as ongs
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    // Método assincrono que faz a criação de uma nova ong no BD
    async create(request, response) {
        //const data = request.body;
    // armazena nas variaveis os diferentes nomes que estão dispostos no body
    const { name, email, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');
    
    console.log(id);

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    });

    return response.json({ id });
    }
};