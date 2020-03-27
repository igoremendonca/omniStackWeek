
// para a criação desse arquivo executei o comando: npx knex migrate:make create_incidents
// com esse comando ele criou o registro da minha migration

// para executar o migration, devemos utilizar o comando: npx knex migrate:latest
// para desfazer o migration podemos executar o comando: npx knex migrate:rollback

exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        // criando chave estrangeira e relacionamento com a tabela Ongs
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
