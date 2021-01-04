const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Users = require('../models/user');
const jwt = require('../config/config');
const config = require('../config/config');


const createUserToken = (userId) => {
    return jwt.sign({ id: userId},config.jwt_pass, {expiresIn: config.jwt_expiresIn});
}


router.get('/', async (request, response) => {
   try { 
    const users = await Users.find({});

    return response.send(users);

   } catch (error) {
        return response.status(500).send({ error: "error in user consultation!"});
   }
});

router.post('/create', async (request,response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).send({ error: "insufficient data"});
    };

    try {
        if (await Users.findOne({email})) {
            return response.status(400).send({ error: "User already registered"});
        }

        const user = await Users.create(request.body);
        user.password = undefined;
        return response.status(201).send({user, token: createUserToken(user.id)});

    } catch (error) {
        return response.status(500).send({error: " Error to find user!"});
    }
});

router.post('/auth', async  (request,response) => {
    const {email, password} = request.body;

    if(!email || !password) {
        return response.status(400).send({ error: "insufficient data"});
    };

    try {
        const user = await Users.findOne({ email }).select('+password');

        if(!user) {
            return response.status(400).send({ error: "unregistered user"});
        }

        const passwordAtuthentication = await bcrypt.compare(password, user.password);

        if(!passwordAtuthentication) {
            return response.status(401).send({ error: "error to authenticating user"});
        }

        user.password = undefined;

        return response.send({user, token: createUserToken(user.id)});

    } catch (error) {
        return response.status(500).send({ error: "error to get user"});
    }  
});

module.exports = router;
