import { Response } from "express";
import { Schema } from "mongoose";
import { UserDocument } from "../models";

const sendToken = function (
	res: Response,
	user: UserDocument & { _id: Schema.Types.ObjectId },
	statusCode: number,
	message: string,
) {
	const token = user.getJWTToken();

	const options = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
	};

	res.status(statusCode).cookie("chatNationToken", token, options).json({
		success: true,
		message,
		user: user.getUser(),
	});
};

export default sendToken;
