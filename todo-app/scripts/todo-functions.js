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
    if ( filteredTodos.length > 0){
        filteredTodos.forEach((todo) => {
            document.querySelector('#todos').appendChild(generateTodoDom(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        document.querySelector('#todos').appendChild(messageEl)
    }   
}

// Get DOM elements for an individual note
const generateTodoDom =  (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')

    //checkbox setup
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    containerEl.appendChild(checkBox)
    checkBox.addEventListener('change', function(){
        todoCompleted(todo.id)
        saveTodos(todos)
        renderTodos(todos,filter)
    })

    //setup todo text
    const todoText = document.createElement('span')   
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    //setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //setup remove button
    const removeButton = document.createElement('button')
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
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
    const plural = incompleteToDos.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteToDos.length} to-do${plural} left`
    
    return summary
}