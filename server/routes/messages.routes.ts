import { Router } from "express";
import { addMessage, fetchAllMessages } from "../controllers";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/add-message").post(isUserAuthenticated, addMessage);
router.route("/fetch-messages/:id").get(isUserAuthenticated, fetchAllMessages);

export default router;
