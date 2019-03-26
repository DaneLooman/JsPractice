'use strict'

// read existing notes from local storage
const getSavedNotes =  () => {
    const notesJSON = localStorage.getItem('notes')
    try{
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e){
        return []
    }
}
// save notes to local storace
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//remove single note from list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if (noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}


// generate DOM structure for Note
const generateNoteDOM =  (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    
    //set up note title text
    if (note.title.length > 0){
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //set up link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //set up status message
    statusEl.textContent = generateLastEdited(note.updateAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    return noteEl
}

//sort notes by different ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'edited'){
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            } else if (a.updateAt < b.updateAt){
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'created'){ 
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt){
                return -1
            } else if (a.createdAt < b.createdAt){
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'abc'){
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            } else {
                return 0
            }
        })
    }
}

//render application notes
const renderNotes =  (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter( (note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    notesEl.innerHTML = ''

    if (filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = "No notes to show"
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

//generate last editied message
const generateLastEdited = (timestamp) => {
    return `Last editied ${moment(timestamp).fromNow()}` 
}