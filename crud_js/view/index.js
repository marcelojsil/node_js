const bodyParser = require('body-parser')
const Sequelize  = require('sequelize')
const express = require('express')

// == CONEXÃO COM O BD ==
const sequelize = new Sequelize('teste','root','', {
    host: "localhost",
    dialect: 'mysql'
})

// == CONFIG EXPRESS ==
const app = express()
app.use(express.json())

// == CONFIG O BODY PARSER ==
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// == CRIAÇÃO DE TABELA ==
const Usuarios = sequelize.define('users', {
    nome: {type: Sequelize.STRING},
    email: {type: Sequelize.TEXT}
})
//Usuarios.sync({force: true})

// == ROTAS ===========================================
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/view/formAddUser.html') 
    })
// ==>> Adcicionar usuário (POST)
app.post('/',(req,res) => {
    Usuarios.create({
        nome: req.body.nome,
        email: req.body.email
    })
    .then(()=>{res.sendFile(__dirname+'/view/listUsers.html')})
    .catch((erro)=>{res.send('Erro ao adicionar pessoa'+erro)})
})
// ==>> Listar usuários (GET)
app.get('/list', (req,res) => {
    res.sendFile(__dirname+'/view/listUsers.html')
})
app.post('/list',(req,res) => {
    Usuarios.push({
        nome: req.body.nome,
        email: req.body.nome
    })
})

// ==>> Editar usuário (PUSH)

// ==>> Deletar usuário da tabela (GET)



// == SERVIDOR ==
app.listen(3000)

/*
app.post('/addSucess', (req,res) => {
    table.Pessoas.create({
        nome: req.body.nome,
        email: req.body.email
    }).then(()=>{res.redirect('/listaPessoas')})
    .catch((erro)=>{res.send('Erro ao adicionar pessoa'+erro)})
})
    */