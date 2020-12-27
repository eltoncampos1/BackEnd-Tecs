import express from 'express';
import bodyParser from 'body-parser';

import usersRouter from './routes/users.js';

const app = express();
const PORT = 3333;
app.use(bodyParser.json())

app.use('/users', usersRouter)

app.get('/', (request, response) => {
    response.send('Hello Wold');
})

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`)
})