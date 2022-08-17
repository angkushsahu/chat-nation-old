import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Chat, Message, User } from "../models";
import { ErrorHandler } from "../utils";

export const addMessage = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { chatId, content } = req.body;
		if (!content || !chatId) {
			return next(new ErrorHandler("Invalid request", 400));
		}

		const newMessage = {
			sender: res.locals.user.id,
			content,
			chat: chatId,
		};

		const message = await Message.create(newMessage);
		if (!message) {
			return next(new ErrorHandler("Unable to send message", 400));
		}

		let populatedMessage = await message.populate("sender", "name pic");
		populatedMessage = await message.populate("chat");
		const allFields = await User.populate(message, {
			path: "chat.users",
			select: "name pic email",
		});

		await Chat.findByIdAndUpdate(chatId, {
			latestMessage: message,
		});

		res.status(201).json({
			success: true,
			message: "Message sent successfully",
			msg: allFields,
		});
	},
);

export const fetchAllMessages = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const chatId = req.params.id;
		const messages = await Message.find({ chat: chatId })
			.populate("sender", "name pic email")
			.populate("chat");

		res.status(200).json({
			success: true,
			message: "Fetched all messages successfully",
			msgs: messages,
		});
	},
);
