import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../AuthContext";
import { buildPath } from "../BuildPath";

/*
TODOs:
- Scrap dropdown and create a column for all notes
    - Pull all notes with useEffect at loadup
- Show active note on the right of the page (next to column)
    - Highlight active note in column
- Create button below column
    - Creates a new note immediately (empty)
    - Text box next to button for naming it
- Edit note to turn it into a text field
    - Save button for editing a note
*/

export const Comments = () => {
	const [activeNote, setActiveNote] = useState(null);
	const [allNotes, setAllNotes] = useState([]);

	const { user } = useContext(AuthContext);

	const saveNote = async () => {
		try {
			const res = await fetch(buildPath(`/api/note/${activeNote._id}`), {
				method: "PATCH",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
				body: JSON.stringify(activeNote),
			});
			if (res.status === 200) await getAllNotes();
		} catch (err) {
			console.error(err);
		}
	};

	const createNote = async () => {
		if (activeNote) await saveNote();

		try {
			const res = await fetch(buildPath("/api/note/"), {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
				body: JSON.stringify({
					title: "Untitled Note",
					date: new Date(),
					note: "",
					userID: user.id,
				}),
			});

			if (res.status === 200) {
				const data = await res.json();
				const retNotes = await getAllNotes();
				retNotes.forEach((note) => {
					if (note._id === data.newNote._id) setActiveNote(note);
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	const getAllNotes = async () => {
		try {
			const res = await fetch(buildPath("/api/note/"), {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
			});
			if (res.status === 200) {
				let notes = await res.json();
				notes = notes.map((note) => ({
					...note,
					date: new Date(note.date),
				}));
				notes.sort((a, b) => {
					return b.date.getTime() - a.date.getTime();
				});

				setAllNotes(notes);
				return notes;
			}
		} catch (err) {
			console.error(err);
		}
		return null;
	};

	const changeToNote = async (newNote) => {
		console.log(newNote);
		if (activeNote) await saveNote();
		setActiveNote(newNote);
	};

	const updateActiveNote = (providedNotes) => {
		const from = providedNotes ?? allNotes;
		if (!activeNote) {
			setActiveNote(from[0]);
		} else {
			from.forEach((note) => {
				if (note._id === activeNote._id) setActiveNote(note);
			});
		}
	};

	useEffect(() => {
		getAllNotes().then((notes) => updateActiveNote(notes));
	}, []);

	function getFormattedDate(date) {
		if (typeof date === "string") return date;

		var year = date.getFullYear();

		var month = (1 + date.getMonth()).toString();
		month = month.length > 1 ? month : "0" + month;

		var day = date.getDate().toString();
		day = day.length > 1 ? day : "0" + day;

		return month + "/" + day + "/" + year;
	}

	return (
		<div id="notesContainer">
			<div id="notesDrawer">
				<h3 id="drawerHeader">Your Notes</h3>
				<div id="drawerContainer">
					{allNotes.map((note) => {
						return (
							<button
								className="noteRow"
								onClick={() => changeToNote(note)}
								key={note._id}
							>
								<p
									className="noteRowTitle"
									placeholder="Note Title"
								>
									{note.title ?? "Untitled Note"}
								</p>
							</button>
						);
					})}
				</div>
			</div>
			<div id="activeNoteContainer">
				{activeNote ? (
					<>
						<input
							id="noteTitle"
							onChange={(e) =>
								setActiveNote({
									...activeNote,
									title: e.target.value,
								})
							}
							value={activeNote ? activeNote.title : ""}
						/>
						<h4 id="noteDate">
							{activeNote && activeNote.date
								? getFormattedDate(activeNote.date)
								: "Date N/A"}
						</h4>
					</>
				) : (
					<h1 id="notePlaceholderText">Create note to get started!</h1>
				)}

				<textarea
					id="noteNote"
					onChange={(e) =>
						setActiveNote({
							...activeNote,
							note: e.target.value,
						})
					}
					value={activeNote ? activeNote.note : ""}
				></textarea>

				<div id="saveContainer">
					<button
						id="createNoteButton"
						className="noteButton"
						onClick={createNote}
					>
						Blank Note
					</button>
					<button
						id="saveNoteButton"
						className="noteButton"
						onClick={saveNote}
					>
						Save Note
					</button>
				</div>
			</div>
		</div>
	);
};

export default Comments;
