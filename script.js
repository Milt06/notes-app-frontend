const API_BASE = 'https://notes-app-backend-zo0v.onrender.com';
const notesList = document.getElementById('notesList');
const noteInput = document.getElementById('noteInput');

async function fetchNotes() {
  try {
    const res = await fetch(`${API_BASE}/notes`);
    const data = await res.json();
    renderNotes(data);
  } catch (err) {
    console.error("Failed to fetch notes:", err);
  }
}

async function addNote() {
  const text = noteInput.value.trim();
  if (!text) return;

  try {
    await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    noteInput.value = '';
    fetchNotes();
  } catch (err) {
    console.error("Failed to add note:", err);
  }
}

async function deleteNote(id) {
  try {
    await fetch(`${API_BASE}/notes/${id}`, {
      method: 'DELETE',
    });
    fetchNotes();
  } catch (err) {
    console.error("Failed to delete note:", err);
  }
}

function renderNotes(notes) {
  notesList.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note.text;

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.style.marginLeft = '10px';
    delBtn.onclick = () => deleteNote(note.id);

    li.appendChild(delBtn);
    notesList.appendChild(li);
  });
}

// Load notes on page load
fetchNotes();
