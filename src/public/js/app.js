// ****** SELECT ITEMS **********
const alert   = document.querySelector('.alert'),
    form      = document.querySelector('.todo-form'),
    todoInput = document.querySelector('#todo'),
    submitBtn = document.querySelector('.submit-btn'),
    container = document.querySelector('.todo-container'),
    clearBtn  = document.querySelector('.clear-btn')

// edit option
let editElement,
    editFlag = false,
    editID   = ""

form.addEventListener('submit', addItem)
clearBtn.addEventListener('click', clearItems)

async function getTodos () {
    let todos = await request('/todos')
    if (todos.length) {
        container.classList.add('show-container')
    }
    render(todos)
}

async function addItem (e) {
    e.preventDefault()
    const value = todoInput.value
    if (value && !editFlag) {
        let response = await request('/', 'POST', {
            todo: value
        })
        render(response.body)
        displayAlert(response.message, 'success')
        container.classList.add('show-container')
        setBackToDefault()
    }
    else if (value && editFlag) {
        let todos = await editTodo(editID, value)
        editElement.innerHTML = value
        displayAlert(todos.message, 'success')
        setBackToDefault()
    }
    else {
        displayAlert("please enter value", "danger")
    }
}

function displayAlert(text, action) {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)
    setTimeout(() => {
        alert.textContent = ''
        alert.classList.remove(`alert-${action}`)   
    }, 1000)
}

function setBackToDefault () {
    todoInput.value = ''
    editFlag = false
    editID = ""
    submitBtn.textContent = "Submit"
}

async function clearItems () {
    let response = await request('/', 'DELETE')
    container.classList.remove("show-container")
    displayAlert(response.message, 'danger')
    setBackToDefault()
}

async function deleteItem (e) {
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    let response = await request(`/${id}`, 'DELETE')
    items = response.body
    if (items.length === 0) {
        container.classList.remove('show-container')
    }
    render(items)
    displayAlert(response.message, 'danger')
    setBackToDefault()
}

function editItem (e) {
    const element = e.currentTarget.parentElement.parentElement
    editElement = e.currentTarget.parentElement.previousElementSibling
    todoInput.value = editElement.innerHTML
    editFlag = true
    editID = element.dataset.id
    submitBtn.textContent = 'edit'
}

async function editTodo (id, value) {
    let response = await request(`/${id}`, "PUT", {
        todo_id: id,
        todo: value
    })
    return response
}

function render (array) {
    const todoList = document.querySelector('.todo-list')
    let string = ""
    array.forEach((item) => {
        string += `
            <article data-id="${item.todo_id}" class="todo-item">
                <p class="title">${item.todo}</p>
                <div class="btn-container">
                  <button class="edit-btn" type="button">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="delete-btn" type="button">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
            </article>
        `
    })
    todoList.innerHTML = string
    const deleteBtns = document.querySelectorAll('.delete-btn')
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', deleteItem)
    })
    const editBtns = document.querySelectorAll('.edit-btn')
    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', editItem)
    })
}

getTodos()
