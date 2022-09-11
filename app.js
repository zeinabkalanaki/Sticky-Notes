const notesContainer = document.querySelector("#app");
const addNoteBtn = document.querySelector(".add-note");

addNoteBtn.addEventListener("click", () => addNote());

getNotes().forEach((item) => {
  const noteEement = createNoteElement(item.id, item.content);
  notesContainer.insertBefore(noteEement, addNoteBtn);
});

function getNotes() {
  const n = localStorage.getItem("notes");
  if (n == null) return [];
  return JSON.parse(n);
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const noteElement = document.createElement("textarea");
  noteElement.classList.add("note");
  noteElement.value = content;
  noteElement.addEventListener("change", () => {
    updateNote(id, noteElement.value);
  });

  noteElement.addEventListener("dblclick", () => {
    deleteNote(id, noteElement);
  });

  return noteElement;
}

function addNote() {
  const newNoteItem = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteElement = createNoteElement(newNoteItem.id, newNoteItem.content);
  notesContainer.insertBefore(noteElement, addNoteBtn);

  const notes = getNotes();
  notes.push(newNoteItem);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();

  const updateNote = notes.filter((item) => item.id === id)[0];
  updateNote.content = newContent;

  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((item) => item.id != id);
  saveNotes(notes);

  notesContainer.removeChild(element);

}
