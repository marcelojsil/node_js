const {Sequelize, DataTypes} = require('sequelize');

// = Conexão BD MySQL
const sequelize = new Sequelize('gestao_igreja','root','', {
    host: 'localhost',
    dialect: 'mysql'
})


/*
//verifica a conexão com o bd
sequelize.authenticate().then(
    function(){
        console.log("Conectado com Sucesso")
    }
).catch(
    function(erro){
        console.log("Falha ao conectar: "+erro)
    }
)
   */

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
 