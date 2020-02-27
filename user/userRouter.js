const router = require('express').Router();
const users = require('./userModel');

router.get('/', (req, res) => {
    users.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({message: 'Unable to retrieve users.'});
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    users.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json({ removed: deleted });
        } else {
            res.status(404).json({ message: 'Could not find user with given id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete user' });
    });
});

module.exports = router;