import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json({ type: 'application/json' }))

app.get('/', (req, res) => {
    res.send('Hello, Express, how are you today ?');
});

export { app };
