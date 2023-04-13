import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../AuthContext";
import { buildPath } from "../../Components/BuildPath";

import Graph from "../../Components/HomeGraph/graph";
import NavBar from "./../../Components/AccountNav/AccountNav";

export const Dashboard = () => {

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
		<div>
			<NavBar />

			<h3 className="dashTitle">Galvanic Skin Response</h3>
			<div className="dash">
				<Graph />

				<div>
					<textarea className="dashNote"></textarea>
					<button id="saveNoteButton" className="dashButton1"onClick={saveNote}>Save Note</button>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
