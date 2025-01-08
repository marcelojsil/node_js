const db  = require('./bin/db')

const Usuarios = db.sequelize.define('usuarios', {
    nome: db.Sequelize.STRING,
    email: db.Sequelize.TEXT
})
//Usuarios.sync({force: true})

const Pessoas = db.sequelize.define('pessoas', {
    nome: db.Sequelize.STRING,
    email: db.Sequelize.TEXT
})
//Pessoas.sync({force: true})

module.exports = {
    Usuarios: Usuarios,
    Pessoas: Pessoas
}