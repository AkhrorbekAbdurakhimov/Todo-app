const fs = require('fs')
const path = require('path')

const getTodos = () => {
    let todos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'todos.json'), "utf-8")
    todos = todos ? JSON.parse(todos) : []
    return todos
}

module.exports = {getTodos}