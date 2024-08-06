'use strict'

const mongoose = require('mongoose')
const keys = require('../../bin/keys')

module.exports.connect = () => {
    mongoose.connect(keys.databases.connection, err => {
        if(err) {
            console.log('==> [-] mongodb')
        } else {
            console.log('==> [+] mongodb')
        }
    } , {useNewUrlParser: true})
}