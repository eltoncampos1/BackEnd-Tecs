const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/config');


const url = config.bd_string;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };


const app = express();
app.use(bodyParser.json());


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



const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/users', usersRoutes);

app.listen(3333, () => {
    console.log('[Server]: Started at port: 3333');
});


module.exports = app;