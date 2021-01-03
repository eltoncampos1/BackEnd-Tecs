const express = require('express');
const router = express.Router();

const Users = require('../models/user');

router.get('/', (request, response) => {
    Users.find({},(err, data) => {
        if(err) {
            return response.send({ error: "error in user consultation!"})
        }

        return response.send(data);
    })
});

router.post('/create', (request,response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.send({ error: "insufficient data"})
    }

    Users.findOne({email}, (err, data) => {
        if(err) {
            return response.send({error: " Error to find user!"});
        }

        if (data) {
            return response.send({ error: "User already registered"})
        }

        Users.create(request.body, (err,data) => {
            if(err) {
                return response.send({error: " Error to create user!"});
            }

            data.password = undefined;

            return response.send(data);
        });
    });
});

module.exports = router;
