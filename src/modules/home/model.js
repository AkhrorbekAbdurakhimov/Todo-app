const fs = require('fs')
const path = require('path')

const addTodo = (todo) => {
    let todos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'todos.json'), "utf-8")
    todos = todos ? JSON.parse(todos) : []
    let todoId = todos.length ? todos[todos.length - 1].todo_id + 1 : 1
    todos.push({
        todo_id: todoId,
        ... todo
    })
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'todos.json'), JSON.stringify(todos, null, 4))
    return todos
}

const deleteAll = () => {
    let todos = []
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'todos.json'), JSON.stringify(todos, null, 4))
}

const deleteOne = (id) => {
    let todos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'todos.json'), "utf-8")
    todos = todos ? JSON.parse(todos) : []
    todos = todos.filter(todo => todo.todo_id != id)
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'todos.json'), JSON.stringify(todos, null, 4))
    return todos
}

const editTodo = (id, data) => {
    let todos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'todos.json'), "utf-8")
    todos = todos ? JSON.parse(todos) : []
    todos.forEach(item => {
        if (item.todo_id == id) {
            item.todo = data.todo
        }
    })
    console.log(todos);
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'todos.json'), JSON.stringify(todos, null, 4))
}

module.exports = {addTodo, deleteAll, deleteOne, editTodo}