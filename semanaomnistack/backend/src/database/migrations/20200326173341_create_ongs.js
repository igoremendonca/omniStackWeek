
// para a criação desse arquivo executei o comando: npx knex migrate:make create_incidents
// com esse comando ele criou o registro da minha migration

// para executar o migration, devemos utilizar o comando: npx knex migrate:latest
// para desfazer o migration podemos executar o comando: npx knex migrate:rollback

exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
