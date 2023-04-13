import React, { useContext, useEffect, useState } from "react";
import { buildPath } from "../BuildPath";

import { AuthContext } from "../../AuthContext";

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
	const [editing, setEditing] = useState(false);
	const [allNotes, setAllNotes] = useState([
		{
			title: "Example",
			date: new Date(),
			note: "Lorem Ipsum Here, but way longer",
			userID: "irrelevant",
			_id: "irrelevant",
		},
		{
			title: "Example2",
			date: new Date(),
			note: "Lorem Ipsum Here Again",
			userID: "irrelevant",
			_id: "irrelevant",
		},
		{
			title: "Example3",
			note: "You get the jist",
			userID: "irrelevant",
			_id: "irrelevant",
		},
	]);

	const [activeNote, setActiveNote] = useState({});

	const { user } = useContext(AuthContext);

	const saveNote = () => {
		// TODO
	};

	const createNote = () => {
		// TODO
	};

	// useEffect(() => {
	// 	fetch(buildPath("/api/note/"), {
	// 		method: "GET",
	// 		headers: {
	// 			Accept: "application/json",
	// 			"Content-Type": "application/json",
	// 			Authorization: "Bearer " + user.token,
	// 		},
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => setAllNotes(data))
	// 		.catch((err) => console.error(err));
	// }, []);

	console.log(allNotes);

	return (
		<div className="notesContainer">
			<div className="notesDrawer">
				<div class="drawerContainer">
					{allNotes.map((note) => {
						return (
							<div class="noteRow">
								<p class="noteRowTitle">
									{note.title ?? "Untitled Note"}
								</p>
							</div>
						);
					})}
				</div>
				<button id="createNoteButton" onClick={createNote}>
					Blank Note
				</button>
			</div>
			<div id="activeNoteContainer">
				<textarea id="activeNote"></textarea>
				<button id="saveNoteButton" onClick={saveNote}>
					Save Note
				</button>
			</div>
		</div>
	);
};

export default Comments;
