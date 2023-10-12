import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import { onSnapshot } from "firebase/firestore";
import { notesCollection } from "./firebase";

export default function App() {
  // lazy initialize this state    as localStorage.getItem is costly
  // this is the implementation to store notes in localstorage
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("notes")) || [],
  );

  const [currentNoteId, setCurrentNoteId] = React.useState(notes[0]?.id || "");

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // last edit note on top
    // 1. Create a new empty array
    // 2. Loop over the original array
    // 3. if the id matches: put the updated note at the beginning of the new array
    // 4. else: push the old note to the end of the new array
    // 5. return the new array
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });

    //this not rearange notes
    //setNotes((oldNotes) =>
    //  oldNotes.map((oldNote) => {
    //    return oldNote.id === currentNoteId
    //      ? { ...oldNote, body: text }
    //      : oldNote;
    //  }),
    //);
  }

  function deleteNote(event, noteId) {
    //this prevents propagating click to parrents
    // as delete button is on top of note button
    event.stopPropagation();
    setNotes((oldNotes) => {
      return oldNotes.filter((e) => e.id !== noteId);
    });
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={currentNote} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
