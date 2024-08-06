const express = require('express')
const bp = require('body-parser')

// == CRIANDO A APLICAÇÃO APP ==
const app = express()

// configurando o body parser
app.use(bp.json({limit: '10mb'}))
app.use(bp.urlencoded({extended: false}))

//configurando o front end
app.set('view engine', 'ejs')
app.set('views', 'views')

//definindo arquivos estáticos
app.use(express.static('public'))

// chamando as rotas
app.use('/', (req, res) => {
    return res.render('login')
})

// == EXPORTANDO A APLICAÇÃO ==
module.exports = app