import { Router } from "express";
import { ExtractJwt } from "passport-jwt";
import requireLocalAuth from "../../middleware/requireLocalAuth";
import AuthToken from "../../models/AuthToken";
import User from "../../models/User";
import PhysicianNotes from "../../models/PhysicianNotes";
import jwt from "jsonwebtoken";
const router = Router();

router.get("/ping", async (_, res) => {
  res.status(200).json('pong!');
});

router.post("/login", requireLocalAuth,
  async (req, res) => {
    const token = req.user!.generateToken();

    await AuthToken.registerAuthToken(token);

    res.status(200).send({
      token,
      message: "Logged in!"
    });
  });

router.post("/register", async (req, res, next) => {
  // TODO: validate body
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ message: "Another User with this email already exists!" });
    }

    try {
      // TODO: only pass params that should be given on create!
      new User(req.body);

      res.status(201).send({ message: "User created successfully!" });

    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.get("/logout", async (req, res, next) => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (token) {
    const tokData = jwt.decode(token, { json: true });
    if (tokData) {
      const { jti } = tokData;
      const t = await AuthToken.findOne({ jti });
      t?.revoke();
    }
  }
  res.send(false);
});

// Added API for notes... need to be checked.
router.get("/note", async (req, res) => {
  PhysicianNotes.find((err, result) => {
    if(err){
      console.log(err);
    } else{
      res.json(result);
    }
  });
});

router.post("/newNote", async (req, res) => {
  const newNote = new PhysicianNotes(req.body);
  newNote.save();

  console.log("Note added successfully");
});

router.post("/deleteNote", async (req, res) => {
  const id = req.body.idNote;

  PhysicianNotes.findByIdAndDelete(id, (err: any) => {
    if(err){
      console.log(err);
    } else{
      console.log("Note Deleted Successfully");
    }
  });
});


export const basePath = "/auth";

export default router;
