import { Router } from "express";
import * as commentsService from "./comments.service.js";
const router = Router();

router.post("/", commentsService.createBulkComments);
router.patch("/:commentId", commentsService.updateComment);
router.post("/find-or-create", commentsService.findOrCreate);
router.get("/search", commentsService.searchComments);
router.get("/newest/:PostId", commentsService.newest);
router.get("/details/:id", commentsService.commentDetails);
export default router;
