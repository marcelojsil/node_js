// === SERVIDOR MODO HTTP ===
/*var http = require('http');

http.createServer(function(req, res){
    res.end("Olá");
}).listen(8081);

console.log("Servidor rodando");*/
// === ====

const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.end("Seja bem vindo ao nosso app");
});
app.get("/sobre", function(req, res){
    res.end("Seja bem vindo a nossa página sobre");
});

// CARREGANDO PARAMETROS 
app.get("/sobre/:nome/:cargo", function(req, res){
    res.end("<h1>Seja bem vindo "+req.params.nome+"</h1>"+
        "<h2>Sua profissão é "+req.params.cargo+"</h2>"
    );
});


app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});