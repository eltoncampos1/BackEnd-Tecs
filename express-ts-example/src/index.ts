import express from 'express';

const app = express();
const PORT = 8000;
app.get('/', (req, res) => {
    res.send('Server started')
});


app.listen(PORT, () => {
    console.log('[server]: Server is running in port 8000');
});