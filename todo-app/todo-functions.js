'use strict'

// Fetch existing todos from local storage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e){
        return []
    }
}

//Save todos to local Storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Delete todo from local Storage
const removeTodo =  (id) =>{
    const indexedTodo = todos.findIndex((todo) => todo.id === id)
    if (indexedTodo > -1){
        todos.splice(indexedTodo, 1)
    }
}

//mark todo as completed or incomplete
const todoCompleted = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo){
        todo.completed = !todo.completed
    }
}

//Render Application todos based on filters
const renderTodos =  (todos, filter) =>{
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filter.search.toLowerCase())
        const searchCompletedMatch = !filter.hide || !todo.completed
        return searchTextMatch && searchCompletedMatch
    })

    document.querySelector('#todos').innerHTML = ''

    const incompleteToDos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#total').innerHTML = ''
    document.querySelector('#total').appendChild(generateSummaryDOM(incompleteToDos)
    )

    filteredTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDom(todo))
        })
}

// Get DOM elements for an individual note
const generateTodoDom =  (todo) => {
    const todoEl = document.createElement('div')

    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    todoEl.appendChild(checkBox)
    checkBox.addEventListener('change', function(){
        todoCompleted(todo.id)
        saveTodos(todos)
        renderTodos(todos,filter)
    })

    const todoText = document.createElement('span')   
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    const removeButton = document.createElement('button')
    removeButton.textContent = 'x'
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click',() =>{
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filter)
    })

    return todoEl
}

// Get DOM elemets for list summary
const generateSummaryDOM =  (incompleteToDos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteToDos.length} To-Do's left`
    return summary
}