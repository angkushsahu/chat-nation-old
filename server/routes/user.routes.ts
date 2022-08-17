import { Router } from "express";
import {
	forgotPassword,
	getAllUsers,
	getUser,
	resetPassword,
	updateUser,
	userLogin,
	userLogout,
	userSignup,
} from "../controllers";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/get-all-users").get(isUserAuthenticated, getAllUsers);
router.route("/").get(isUserAuthenticated, getUser);
router.route("/logout").get(isUserAuthenticated, userLogout);
router.route("/update/:id").put(isUserAuthenticated, updateUser);
router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").put(resetPassword);

export default router;
