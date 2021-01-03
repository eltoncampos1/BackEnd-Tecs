const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');


const Users = require('../models/user');

router.get('/', (request, response) => {
    Users.find({},(err, data) => {
        if(err) {
            return response.send({ error: "error in user consultation!"});
        }

        return response.send(data);
    })
});

router.post('/create', (request,response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.send({ error: "insufficient data"});
    }

    Users.findOne({email}, (err, data) => {
        if(err) {
            return response.send({error: " Error to find user!"});
        }

        if (data) {
            return response.send({ error: "User already registered"});
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

router.post('/auth', (request,response) => {
    const {email, password} = request.body;

    if(!email || !password) {
        return response.send({ error: "insufficient data"});
    }

    Users.findOne({email}, (err, data) => {
        if(err) {
        return response.send({ error: "error to get user"});
        }

        if(!data) {
            return response.send({ error: "unregistered user"});
        }

        bcrypt.compare(password, data.password, (err,same) => {
            if(!same) {
                return response.send({ error: "error to authenticating user"});
            }

            data.password = undefined;

            return response.send(data);
        });
    }).select('+password');
});

module.exports = router;
