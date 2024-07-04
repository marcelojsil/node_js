const Sequelize  = require('sequelize')
const sequelize = new Sequelize('teste','root','', {
    host: "localhost",
    dialect: 'mysql'
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
