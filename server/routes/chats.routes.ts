import { Router } from "express";
import {
	accessChat,
	addToGroup,
	createGroup,
	deleteGroup,
	fetchChats,
	removeFromGroup,
	renameGroup,
} from "../controllers";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/access-chat").post(isUserAuthenticated, accessChat);
router.route("/fetch-chats").get(isUserAuthenticated, fetchChats);
router.route("/create-group").post(isUserAuthenticated, createGroup);
router.route("/rename-group").put(isUserAuthenticated, renameGroup);
router.route("/add-to-group").post(isUserAuthenticated, addToGroup);
router.route("/remove-from-group").post(isUserAuthenticated, removeFromGroup);
router.route("/delete").delete(isUserAuthenticated, deleteGroup);

export default router;
