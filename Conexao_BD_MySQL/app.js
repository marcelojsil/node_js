// === SERVIDOR MODO HTTP ===
/*var http = require('http');

http.createServer(function(req, res){
    res.end("Olá");
}).listen(8081);

console.log("Servidor rodando");*/
// === ====



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


// CRIA TABELA NO BD
const Postagem = sequelize.define('postagem',{
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
})

// tabela.sync() - CRIA A TABELA (CREATE TABLE)
//Postagem.sync({force: true})

// tabela.create() - INSERI DADOS NA TABELA (INSERT)
Postagem.create({
    titulo: "Teste",
    conteudo: "Conteudo de teste"
}) 

/* verifica a conexão com o bd
sequelize.authenticate().then(
    function(){
        console.log("Conectado com Sucesso")
    }
).cacth(
    function(erro){
        console.log("Falha ao conectar: "+erro)
    }
)*/