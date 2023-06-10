import { Router } from "express";
import { createBlogHandler, deleteBlogHandler, readAllBlogHandler, readBlogHandler, updateBlogHandler } from "../controllers/blogController";
import { isAuthenticated } from "../middleware/authMiddleware"





const router = Router()

router.use(isAuthenticated);
router.route("/").post(createBlogHandler).get(readAllBlogHandler)

router.route("/:id").get(readBlogHandler).patch(updateBlogHandler).delete(deleteBlogHandler)


export default router;