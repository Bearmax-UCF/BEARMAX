import { Router } from "express";
import User from "../../models/User";
const router = Router();

router.get("/ping", async (req, res) => {
  res.status(200).json('pong!');
});

router.post("/register", async (req, res, next) => {
  const newUser = await User.create(req.body);

  req.login(newUser, err => {
    if (err) res.status(400).send({ message: "Registration Failed", err});
    res.status(200).send({
      message: "Signed up",
      user: newUser
    });
  });
});

export default router;
