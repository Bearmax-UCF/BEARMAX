import { Router } from "express";
import path from "path";
import apiRoutes from "./api";
const router = Router();
import {createProxyMiddleware} from "http-proxy-middleware";
import constants from "../utils/constants";

router.use("/api", apiRoutes);
// fallback 404
router.use("/api", (_, res) => res.status(404));

// Serve the frontend app
if (constants.isProduction) {
  router.get("/", (_, res) => {
    res.sendFile(path.resolve(__dirname, "..", "..", "..", "Client", "build", "index.html"))
  });
  router.get("*", (req, res) => {
    const filePath = req.path.split("/")
    res.sendFile(path.resolve(__dirname, "..", "..", "..", "Client", "build", ...filePath))
  });
} else {
  router.use("*",
    createProxyMiddleware({ target: "http://localhost:3000", ws: true })
  );
}

export default router;
