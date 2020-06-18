function loadNotes() {
    let notes = localStorage.getItem('notes');
    return JSON.parse(notes);
}

function refreshLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote(input) {
    if (notes == null)
        notes = new Array();
    notes.push(input);
    refreshLocalStorage();
    displayNotes();
}

function removeNote(id) {
    notes.forEach(note => {
        if (note.id == id) {
            let index = notes.indexOf(note);
            notes.splice(index, 1);
        }
    });
    refreshLocalStorage(notes);
    displayNotes();
}

function displayNotes() {
    let list = document.getElementById("notes-list");
    list.innerHTML = "";

    notes.forEach(note => {
        let singleNote = document.createElement("div");
        singleNote.className = "col s12 note";

        let noteText = document.createElement("span");
        noteText.innerHTML = note.note;

        let noteDeleteButton = document.createElement('a');
        noteDeleteButton.className = "right red waves-effect waves-light btn-floating delete-note";
        noteDeleteButton.addEventListener("click", () => {
            removeNote(note.id);
        });

        let deleteIcon = document.createElement('i');
        deleteIcon.className = "material-icons";
        deleteIcon.innerHTML = "delete";
        noteDeleteButton.appendChild(deleteIcon);

        singleNote.appendChild(noteText);
        singleNote.appendChild(noteDeleteButton);
        list.appendChild(singleNote);
    });
}

document.getElementById('submit-note').addEventListener("click", () =>{
    let textarea = document.getElementById('add-note');
    let input = {
        note : textarea.value.replace(/\n\r?/g, '<br />'),
        id : Math.random().toString(36).substring(7)
    };
    addNote(input);

    textarea.value="";
    textarea.setAttribute('style','');
    textarea.nextElementSibling.className = "";
});

notes = loadNotes();
displayNotes();