const db = require('../data/dbConfig');

module.exports = {
    insert,
    get,
    getBy,
    getById,
    remove
};

async function insert(user) {
    const [id] = await db('user').insert(user, 'id');
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

function remove(id) {
    return getById(id).then(user => {
        return db('user').where({ id }).del().then(count => {
            return user;
        });
    });
}