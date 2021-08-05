const http = require('http').createServer();
const zmq = require("zeromq");
let sock = zmq.socket("sub");
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

sock.connect("tcp://proxy.titan-backend-nyc.com:5556");
sock.subscribe("LK947");
console.log("Subscriber connected to port 5556");

sock.on("message", function(topic, message) {
    let messageString = message.toString('utf-8')
    console.log(
        "received a message related to:",
        topic.toString('utf-8'),
        "containing message:",
        messageString
    );
    io.emit('message', messageString)
});

http.listen(8070, () => console.log('listening on port 8070!'))