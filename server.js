var net = require('net');
var server = net.createServer(function(c){
});

var port = 8081;
var backendPort = 8080;

server.listen(port, function(){
    console.log('Listening on port ' + port);
});

server.on('connection', function(sock){
    console.log("connection from " + sock.remoteAddress);
    
    var sock2Backend = net.createConnection({
        port: backendPort
    });

    sock2Backend.on('data', function(data){
        console.log('from backend\n' + data.toString()); 
        sock.write(data);
    });
    sock.on('data', function(data){
        console.log('from client\n' + data.toString());
        sock2Backend.write(data);
    });
});
