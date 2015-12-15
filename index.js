var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use('/', express.static(__dirname + '/public'))

var redCount = 0
var blueCount = 0
var clients = {}

io.on('connection', function (socket) {
  console.log(socket.id)
  socket.on('disconnect', function () {
    delete clients[socket.id]
  })
  socket.on('chat message', function (color) {
    clients[socket.id] = color
    console.log(clients)

    redCount = 0
    blueCount = 0
    for (var key in clients) {
      console.log(key + ' ' + clients[key])
      if (clients[key] === 'red') {
        redCount++
      } else if (clients[key] === 'blue') {
        blueCount++
      }
    }

    io.emit('chat message', {
      red: redCount,
      blue: blueCount
    })
  })
})

http.listen(8080, function () {
  console.log('listening on *:8080')
})
