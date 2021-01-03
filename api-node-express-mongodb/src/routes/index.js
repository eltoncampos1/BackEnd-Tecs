const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    return response.send({ message: "OK GET INDEX"});
});

router.post('/', (request, response) => {
    return response.send({ message: "OK POST INDEX"});
});

module.exports = router;
