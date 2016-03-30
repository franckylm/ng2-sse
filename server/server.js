'use strict';

const Hapi = require('hapi');
const stream = require('stream');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000,
    routes: { cors: true }
});

server.route({
    method: 'GET',
    path:'/events',
    handler: function (request, reply) {

        var channel = new stream.PassThrough

        var interval = setInterval(function() {
            channel.write("data: " + Math.floor((Math.random() * 100) + 1) + "\n\n");
            console.log("write data...");
        }, 5000);

        request.raw.req.on("close", function() {
            console.error("oops listener closed");
            clearInterval(interval);
        });

        request.raw.res.writeHead(200, {
            'content-type': 'text/event-stream; charset=utf-8',
            'connection': 'keep-alive',
            'cache-control': 'no-cache',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        });

        channel.pipe(request.raw.res);
    }
});

server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});