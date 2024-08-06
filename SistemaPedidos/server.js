const app = require('./bin/index')
const keys = require('./bin/keys')
const connection = require('./src/middlewares/connection')

app.listen(keys.server.port, () => {
    connection.connect();
    console.log('Estou funcionando');
}) 