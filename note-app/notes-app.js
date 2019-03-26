'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'edited'
}

renderNotes(notes,filters)

document.querySelector('#filter1').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)

})

document.querySelector('#filter-by').addEventListener('change',(e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#create-note').addEventListener('click',(e) => {
    const timestamp = moment().valueOf()
    const note = {
        id: uuidv4(),
        title:'',
        body:'',
        createdAt: timestamp,
        updatedAt: timestamp    
    }
    notes.push(note)
    saveNotes(notes)
    location.assign(`/edit.html#${note.id}`)
})

window.addEventListener('storage',(e) =>{
    if (e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes,filters)
    }
})