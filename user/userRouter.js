const router = require('express').Router();
const users = require('./userModel');

router.get('/', (req, res) => {
    users.get().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({message: 'Unable to retrieve users.'});
    })
})

module.exports = router;