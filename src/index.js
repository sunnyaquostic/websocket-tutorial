import express from 'express';
import { matchRouter } from './routes/matches.js';

const app = express()
const PORT = 8005;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from express server')
});

app.use('/matches', matchRouter)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})


