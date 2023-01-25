import { Router } from "express";
import authRoutes from "./auth";
import fs from "fs";
import path from "path";

const router = Router();

fs.readdirSync(path.resolve(__dirname + "/")).forEach(file => {
  const filePath = `./${file.slice(0, -3)}`;
  import(filePath).then(api => {
    router.use(`/${file.slice(0,-3).toLowerCase()}`, api.default);
  });
});
router.use("/auth", authRoutes);

export default router;
