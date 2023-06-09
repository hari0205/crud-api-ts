import { Router } from "express";
import { registerHandler, loginHandler } from "../controllers/authController";





const router = Router()



router.route("/register").post(registerHandler);

router.route("/login").post(loginHandler);

export default router;