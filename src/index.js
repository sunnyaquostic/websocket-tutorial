import express from 'express';
import http from 'http'
import { matchRouter } from './routes/matches.js';
import { attachWebsocketServer } from './ws/server.js';
import { securityMiddleware } from './arcjet.js';
import { commentaryRouter } from './routes/commentary.js';

const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || '0.0.0.0'

const app = express()
const server = http.createServer(app)

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from express server')
});

app.use(securityMiddleware())

app.use('/matches', matchRouter)
app.use('/matches/:id/commentary', commentaryRouter)

const { broadcastMatchCreated, broadcastCommentary } = attachWebsocketServer(server)
app.locals.broadcastMatchCreated = broadcastMatchCreated;
app.locals.broadcastCommentary = broadcastCommentary;

server.listen(PORT, HOST, () => {
    const basedUrl = HOST === '0.0.0.0' ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;

    console.log(`Server is running on ${basedUrl}`)
    console.log(`Websocket Server is running on ${basedUrl.replace('http', 'ws')}/ws`)
})


