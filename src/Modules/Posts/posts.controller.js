import { Router } from "express";
import * as postsService from "./posts.service.js";
const router = Router();

router.post("/", postsService.createNewPost);
router.delete("/:postId", postsService.deletePost);
router.get("/details", postsService.postsDtails);
router.get("/comment-count", postsService.commentCount);

export default router;
