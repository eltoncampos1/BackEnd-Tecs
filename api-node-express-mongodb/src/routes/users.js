const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');


const Users = require('../models/user');

router.get('/', async (request, response) => {
   try { 
    const users = await Users.find({});

    return response.send(users);

   } catch (error) {
        return response.send({ error: "error in user consultation!"});
   }
});

router.post('/create', async (request,response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.send({ error: "insufficient data"});
    };

    try {
        if (await Users.findOne({email})) {
            return response.send({ error: "User already registered"});
        }

        const user = await Users.create(request.body);
        user.password = undefined;
        return response.send(user);

    } catch (error) {
        return response.send({error: " Error to find user!"});
    }
});

router.post('/auth', async  (request,response) => {
    const {email, password} = request.body;

    if(!email || !password) {
        return response.send({ error: "insufficient data"});
    };

    try {
        const user = await Users.findOne({ email }).select('+password');

        if(!user) {
            return response.send({ error: "unregistered user"});
        }

        const passwordAtuthentication = await bcrypt.compare(password, user.password);

        if(!passwordAtuthentication) {
            return response.send({ error: "error to authenticating user"});
        }

        user.password = undefined;

        return response.send(user);

    } catch (error) {
        return response.send({ error: "error to get user"});
    }  
});

module.exports = router;
