import { Router } from "express";
import { createCommentHandler, deleteCommentHandler, updateCommentHandler } from "../controllers/commentController";
import { isAuthenticated } from "../middleware/authMiddleware"





const router = Router()

router.use(isAuthenticated)
router.route("/:id/comments").post(createCommentHandler).patch(updateCommentHandler).delete(deleteCommentHandler)




export default router;