import express from "express";
import multer from "multer";

import {
  uploadCertificates,
  verifyCertificate,
  downloadCertificate
} from "../controllers/certificate.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Memory storage for Excel upload
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadCertificates
);
router.get("/verify/:certificateId", verifyCertificate);
router.get("/download/:certificateId", downloadCertificate);

export default router;
