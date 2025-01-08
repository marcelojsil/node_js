const express = require('express')
const app = express()
const bodyParser = require('body-parser')


// == ARQUIVO COM CRIAÇÃO DAS TABELAS
const table = require('./create_db')


// == CONFIGURANDO O BODY PARSER ==

app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// == CONFIGURANDO O FRONT-END (EJS) ==

app.set('view engine', 'ejs')
app.set('views', 'views')


// <==><==><==><==><==><==><==><==><==> //
// <==><==> ROTAS DO EXPRESS <==><==> //

// => PAGINA LOGIN
    app.get('/', (req, res) => {
        return res.render('login') })

    app.post('/mainUser', (req,res) => {
        return res.render('mainUser')
    })

// => INSERT TAB PESSOAS
    app.get('/pessoas', (req, res) => {
        return res.render('pessoas')   })

    app.post('/addSucess', (req,res) => {
        table.Pessoas.create({
            nome: req.body.nome,
            email: req.body.email
        }).then(()=>{res.send('Pessoa adicionada com sucesso!')})
        .catch((erro)=>{res.send('Erro ao adicionar pessoa'+erro)})
    })


// == CONFIRMAÇÃO DE CONEXÃO DO SERVIDOR == //

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
})

// == EXPORTANDO A APLICAÇÃO ==

module.exports = app
