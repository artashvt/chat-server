const app = require('express')();
const http = require('http');
const env = require('./env.js');
const bodyParser = require("body-parser");
const host = env.host;

const server = http.Server(app);
const port = env.httpPort;

const authToken = env.authToken;
const tokenKey = 'X-AUTH-TOKEN';

let auth = {
    check: function (token) {
        return token === authToken;
    }
};

const authMiddleware = (req, res, next) => {
    if(!auth.check(req.header(tokenKey))) {
        return res.status(401).json({
            message: "unauthorized",
        });
    }
    next();
};


server.listen(port, function () {
    console.log('Server is running and listening port: ' + port);
});

const io = require('socket.io')(server, {cors: {origin: host}});

io.on('connection', (socket) => {
    socket.on('join', function (req) {
        if (req.authToken === authToken) {
            // Join to room
            socket.join(req.roomId);
        }
    });

});

app.use(authMiddleware);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/', function (req, res) {
    res.json({
        status: "ok"
    });
    const message = req.body;
    io.to(message.room_id).emit('chat', message);
});
