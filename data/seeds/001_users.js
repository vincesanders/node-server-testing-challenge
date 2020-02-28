
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('user').insert([
        {username: 'layzie', password: 'layyour', department: 'sales'},
        {username: 'bizzy', password: 'bodybeside', department: 'sales'},
        {username: 'wish', password: 'meletmefeel', department: 'hr'}
    ]);
};
