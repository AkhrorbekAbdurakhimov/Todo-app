const {getTodos} = require('./model')

const GET = (req, res) => {
    res.status(200).json(getTodos())
}

module.exports = {GET}