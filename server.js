import{ WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket, request) => {
    const ip = request.socket.remoteAddress;

    socket.on('message', (rawData) => {
        const message = rawData.toString()
        console.log({ rawData, ip })

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) client.send(`server broadcast: ${message}`)
        })
    })

    socket.on('error', (error) => {
        console.error({ Error: error.message, ip })
    })

    socket.on('close', () => {
        console.log({message: 'client disconnected', ip })
    })
})

console.log('Server is running on port 8080')