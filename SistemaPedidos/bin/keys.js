'use strict'

module.exports = {
    server: {
        port: process.env.port || 3000
    },
    databases: {
        connection: process.env.connection || 'mongodb://127.0.0.1:27017'
    },
    auth: {
        secret: 'c1c2c3'
    }
}

