import express from 'express';
import http from 'http'
import { matchRouter } from './routes/matches.js';
import { attachWebsocketServer } from './ws/server.js';

const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || '0.0.0.0'

const app = express()
const server = http.createServer(app)

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from express server')
});

app.use('/matches', matchRouter)

const { broadcastMatchCreated } = attachWebsocketServer(server)
app.locals.broadcastMatchCreated = broadcastMatchCreated;

server.listen(PORT, HOST, () => {
    const basedUrl = HOST === '0.0.0.0' ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;

    console.log(`Server is running on ${basedUrl}`)
    console.log(`Websocket Server is running on ${basedUrl.replace('http', 'ws')}/ws`)
})


