const express = require('express')
const todoRouter = express.Router()
const {GET} = require('./controller')

todoRouter.route('/todos')
    .get(GET)

module.exports = todoRouter