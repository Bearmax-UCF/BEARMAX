import { Router } from "express";
import requireJwtAuth from "../../middleware/requireJwtAuth";
import PhysicianNotes from "../../models/PhysicianNotes";
const router = Router();

router.get("/", requireJwtAuth, async (req, res, next) => {
	try {
		console.log(req.user);
		const allNotes = await PhysicianNotes.find({
			userID: req.user?._id.toString(),
		});
		res.status(200).json(allNotes);
	} catch (err) {
		next(err);
	}
});

router.post("/", requireJwtAuth, async (req, res, next) => {
	try {
		const newNote = new PhysicianNotes(req.body);
		newNote.save();

		res.status(200).json({ message: "Note added successfully" });
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", requireJwtAuth, async (req, res, next) => {
	try {
		const note = PhysicianNotes.findByIdAndDelete(req.params.id);
		res.status(200).json(note);
	} catch (err) {
		next(err);
	}
});

export const basePath = "/note";

export default router;
