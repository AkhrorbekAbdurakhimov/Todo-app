const express = require('express')
const homeRouter = express.Router()
const {GET, POST, DELETE, PUT, DELETE_ONE} = require('./controller')

homeRouter.route('/')
    .get(GET)
    .post(POST)
    .delete(DELETE)

homeRouter.delete('/:id', DELETE_ONE)
homeRouter.put('/:id', PUT)

module.exports = homeRouter