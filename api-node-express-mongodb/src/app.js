const express = require('express');
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

const app = express();
app.use(express.json());


app.use('/', indexRoutes);
app.use('/users', usersRoutes);


app.listen(3333, () => {
    console.log('[Server]: Started at port: 3333');
});


module.exports = app;