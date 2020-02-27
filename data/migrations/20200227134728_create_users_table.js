exports.up = function(knex) {
    return knex.schema.createTable('user', tbl => {
        tbl.increments().unsigned();
        tbl.string('username').notNullable().unique();
        tbl.string('password').notNullable();
        tbl.string('department').notNullable().index();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
};