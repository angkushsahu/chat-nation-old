import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Chat, User } from "../models";
import { ErrorHandler } from "../utils";

export const accessChat = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { userId } = req.body;
		if (!userId) {
			return next(new ErrorHandler("User id parameter not sent with request", 400));
		}

		const isChat = await Chat.find({
			isGroupChat: false,
			$and: [
				{ users: { $elemMatch: { $eq: res.locals.user.id } } },
				{ users: { $elemMatch: { $eq: userId } } },
			],
		})
			.populate("users", "-password")
			.populate("latestMessage");

		const chat = await User.populate(isChat, {
			path: "latestMessage.sender",
			select: "name pic email",
		});

		if (chat.length > 0) {
			res.status(200).json({
				success: true,
				message: "Found chat successfully",
				chat: chat[0],
			});
		} else {
			const chatData = {
				chatName: "sender",
				isGroupChat: false,
				users: [res.locals.user.id, userId],
			};

			const createdChat = await Chat.create(chatData);
			if (!createdChat) {
				return next(new ErrorHandler("Unable to create new chat", 500));
			}

			const FullChat = await Chat.findOne({ _id: createdChat.id }).populate(
				"users",
				"-password",
			);

			res.status(201).json({
				success: true,
				message: "New chat created successfully",
				fullchat: FullChat,
			});
		}
	},
);

export const fetchChats = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const chats = await Chat.find({ users: { $elemMatch: { $eq: res.locals.user.id } } })
			.populate("users", "-password")
			.populate("groupAdmin", "-password")
			.populate("latestMessage")
			.sort({ updatedAt: -1 });

		const chatsWithLatestMessageSender = await User.populate(chats, {
			path: "latestMessage.sender",
			select: "name email pic",
		});

		res.status(200).json({
			success: true,
			message: "Fetched all chats successfully",
			chatsWithLatestMessageSender,
		});
	},
);

export const createGroup = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { users, name } = req.body;
		if (!users || !name) {
			return next(new ErrorHandler("Please fill in the required fields", 400));
		}

		if (users.length < 2) {
			return next(new ErrorHandler("More than two users are required to form a group", 400));
		}

		users.push(res.locals.user.id);

		const groupChat = await Chat.create({
			chatName: req.body.name,
			users,
			isGroupChat: true,
			groupAdmin: res.locals.user.id,
		});
		if (!groupChat) {
			return next(new ErrorHandler("Unable to create a group chat, please try again", 500));
		}

		const fullGroupChat = await Chat.findOne({ _id: groupChat.id })
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		res.status(201).json({
			success: true,
			message: "Created a new group",
			groupChat: fullGroupChat,
		});
	},
);

export const renameGroup = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { chatId, chatName } = req.body;
		const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		if (!updatedChat) {
			return next(new ErrorHandler("Unable to rename group, please try again", 400));
		}

		res.status(200).json({ success: true, message: "Renamed chat successfully", updatedChat });
	},
);

export const addToGroup = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { chatId, userId } = req.body;
		const updatedChat = await Chat.findByIdAndUpdate(
			chatId,
			{ $push: { users: userId } },
			{ new: true },
		)
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		if (!updatedChat) {
			return next(new ErrorHandler("Unable to add member, please try again", 400));
		}

		res.status(200).json({ success: true, message: "Member added successfully", updatedChat });
	},
);

export const removeFromGroup = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { chatId, userId } = req.body;
		const updatedChat = await Chat.findByIdAndUpdate(
			chatId,
			{ $pull: { users: userId } },
			{ new: true },
		)
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		if (!updatedChat) {
			return next(new ErrorHandler("Unable to remove member, please try again", 400));
		}

		res.status(200).json({
			success: true,
			message: "Member removed successfully",
			updatedChat,
		});
	},
);

export const deleteGroup = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { chatId } = req.body;
		const chatGroup = await Chat.findById(chatId);
		if (!chatGroup) {
			return next(new ErrorHandler("Chat group not found", 404));
		}

		if (res.locals.user.id !== chatGroup.groupAdmin.toString()) {
			return next(new ErrorHandler("Only group admin can perform this action", 400));
		}

		await chatGroup.remove();

		res.status(200).json({
			success: true,
			message: "Chat group deleted successfully",
		});
	},
);
