#!/usr/bin/env node

import { Message } from "websocket";
import { UserManager } from "./store/UserManager";

var server = require('websocket').server;
var http = require('http');

var serve = http.createServer(function (request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
serve.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new serve({
    httpServer: serve,
    autoAcceptConnections: false
});

function originIsAllowed(origin: string) {
    return true;
}

wsServer.on('request', function (request: any) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message: any) {
        // todo add rate lim
        if (message.type === 'utf8') {
            try {
                messageHandler(JSON.parse(message.utf8Data))
            } catch(e) {

            }
            // console.log('Received Message: ' + message.utf8Data);
            // connection.sendUTF(message.utf8Data);
        }
    });
    connection.on('close', function (reasonCode: any, description: any) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

function messageHandler(message: Message) {
    
}