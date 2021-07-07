const path = require('path')
const {addTodo, deleteAll, deleteOne, editTodo} = require('./model')

const GET = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'views', 'index.html'))
}

const POST = (req, res) => {
    let todos = addTodo(req.body)
    if (todos) {
        res.status(201).json({
            message: "The new todo has added",
            body: todos
        })
    }
}

const DELETE = (req, res) => {
    deleteAll()
    res.status(200).json({
        message: "All todos are deleted"
    })
}

const PUT = (req, res) => {
    console.log(req.params.id, req.body);
    editTodo(req.params.id, req.body)
    res.status(200).json({
        message: "The todo edit successfully"
    })
}

const DELETE_ONE = (req, res) => {
    let todos = deleteOne(req.params.id)
    if (todos) {
        res.status(200).json({
            message: "The todo is removed",
            body: todos
        })
    }
}

module.exports = {GET, POST, DELETE, DELETE_ONE, PUT}