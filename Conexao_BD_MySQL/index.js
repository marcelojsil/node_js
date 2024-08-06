const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Sequelize  = require('sequelize')

// == CONFIG == 
    // = Template Engine =
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
    
    // = Conexão BD MySQL
const sequelize = new Sequelize('teste','root','', {
    host: "localhost",
    dialect: 'mysql'
})

    // = Rotas =
app.get('/cad', function(req, res){
    res.send('Rota de cadastro')
})

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});