const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.path ||3000 
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection',(socket) =>{
    console.log(`new websocket connection`)

    socket.emit('message','welcome!')
    socket.broadcast.emit('message','A new user has joined!..')

    socket.on('sendMessage',(message) => {
        io.emit('message',message)
    })
    socket.on('disconnect',()=>{
        io.emit('message', 'A user has left!..')
    })
})



server.listen(port,() => {
    console.log(`Server is up on port ${port}!`)
})