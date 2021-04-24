import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

/* game.addPlayer({ playerId: 'player1', playerX: 0, playerY: 0})
game.addPlayer({ playerId: 'player2', playerX: 5, playerY: 1})
game.addPlayer({ playerId: 'player3', playerX: 3, playerY: 2})
game.addFruit({ fruitId: 'fruit1', fruitX: 1, fruitY: 5})
game.addFruit({ fruitId: 'fruit2', fruitX: 2, fruitY: 2})
console.log(game.state)
game.addFruit({ fruitId: 'fruit3', fruitX: 3, fruitY: 10}) */
const game = createGame()

game.subscribe((command) => {
  console.log(`Emmiting ${command.type}`)
  sockets.emit(command.type, command)
})

sockets.on('connection', (socket) => {
  const playerId = socket.id
  console.log(`Player connected on Server with id: ${playerId}`)

  game.addPlayer({ playerId })

  socket.emit('setup', game.state)

  socket.on('disconnect', () => {
    game.removePlayer( { playerId })
    console.log(`Player disconnected: ${playerId}`)
  })
})

server.listen(3000, () => {
  console.log('server listen on port 3000')
})