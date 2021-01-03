const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    return response.send({ message: "OK GET USERS"});
});

router.post('/', (request, response) => {
    return response.send({ message: "OK POST USERS"});
});

router.post('/create', (request,response) => {
    return response.send({ message: "User created"})
})

module.exports = router;
