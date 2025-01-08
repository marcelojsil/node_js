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

// == SERVIDOR ==
app.listen(3000)


// == ROTA DE LISTAGEM ==
/*
app.get("/", (req,res) => {
    Usuarios.select({
        nome: req.body.nome,
        email: req.body.email
    })
    Usuarios.sequelize.execute('SELECT * FROM users')
    return console.log(Usuarios)
})
*/

class taskController {
    novoUsuario(req,res){
        
        sequelize.select("*").table('users')
            .then(usuarios => {
                console.log(usuarios)
                response.json(usuarios)
            }).catch(error => {
                console.log(error)
        })
    }
}

console.log(taskController)



