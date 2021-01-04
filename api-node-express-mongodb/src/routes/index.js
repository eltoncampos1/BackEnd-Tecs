const express = require('express');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, (request, response) => {
    console.log(response.locals.auth_data);
    return response.send({ message: "OK GET INDEX"});
});

router.post('/', (request, response) => {
    return response.send({ message: "OK POST INDEX"});
});

module.exports = router;

