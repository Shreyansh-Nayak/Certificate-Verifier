import express from "express";
import { loginAdmin, googleLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/google-login", googleLogin);

export default router;
