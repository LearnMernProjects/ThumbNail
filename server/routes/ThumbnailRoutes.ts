import express from "express";
import { generateThumbnail, deleteThumbnail } from "../controllers/ThumbnailController.js";
import protect from "../middleware/auth.js";

const ThumbnailRouter = express.Router();

console.log('ThumbnailRoutes loaded - setting up routes');

ThumbnailRouter.post("/generate", protect, (req, res, next) => {
    console.log('POST /generate route hit');
    next();
}, generateThumbnail);

ThumbnailRouter.delete("/delete/:id", protect, (req, res, next) => {
    console.log('DELETE /delete/:id route hit with id:', req.params.id);
    next();
}, deleteThumbnail);

export default ThumbnailRouter;