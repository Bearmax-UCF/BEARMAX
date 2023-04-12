import { Router } from "express";
import requireJwtAuth from "../../middleware/requireJwtAuth";
import PhysicianNotes from "../../models/PhysicianNotes";
const router = Router();

// Added API for notes... need to be checked.
router.get("/", requireJwtAuth, async (req, res) => {
  const notes = await PhysicianNotes.find();

  res.status(200).json(notes);
});

router.post("/", requireJwtAuth, async (req, res, next) => {
  try {
    const newNote = new PhysicianNotes(req.body);
    newNote.save();

    res.status(200).json({message: "Note added successfully"});
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const note = PhysicianNotes.findByIdAndDelete(req.params.id);

    res.status(200).json(note);
  } catch (err) {
    next(err);
  }
});


export const basePath = "/note";

export default router;

