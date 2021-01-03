const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

// DB MONGO
const url = 'mongodb+srv://user_admin:SelX2rsUhtDG7uMU@clusterapi.le3eg.mongodb.net/mongodb?retryWrites=true&w=majority';
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log("Connection database error: " + err);
});

mongoose.connection.on('disconnected', () => {
    console.log("application disconnected from the database");
});

mongoose.connection.on('connected', () => {
    console.log("application connected from database");
});

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/', indexRoutes);
app.use('/users', usersRoutes);


app.listen(3333, () => {
    console.log('[Server]: Started at port: 3333');
});


module.exports = app;