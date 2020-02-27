const db = require('../data/dbConfig');

module.exports = {
    insert,
    get,
    getBy,
    getById
};

async function insert(user) {
    const [id] = await db('user').insert(user);
    return getById(id);
}

function get() {
    return db('user');
}

function getBy(filter) {
    return db('user').where(filter).first();
}

function getById(id) {
    return db('user').where({ id }).first();
}