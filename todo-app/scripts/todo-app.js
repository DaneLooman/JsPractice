'use strict'

const todos = getSavedTodos()

const filter = {
    search: '',
    hide: false
}

renderTodos(todos,filter)

document.querySelector('#todoFilter').addEventListener('input', (e) => {
    filter.search = e.target.value
    renderTodos(todos, filter)
})

document.querySelector('#create').addEventListener('submit', (e) =>{
    const text = e.target.elements.newNote.value.trim()

    e.preventDefault()
    
    if (text.length > 0){
        todos.push({
            id: uuidv4(),
            text,
            completed:false
        })
        saveTodos(todos)
        renderTodos(todos,filter)
        e.target.elements.newNote.value = ''
    }
})

document.querySelector('#hide-done').addEventListener('change',(e) =>{
    filter.hide = e.target.checked
    renderTodos(todos, filter)
})