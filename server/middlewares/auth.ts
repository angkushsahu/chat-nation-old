import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../models";
import { ErrorHandler } from "../utils";
import catchAsyncErrors from "./catchAsyncErrors";

const isUserAuthenticated = catchAsyncErrors(async function (
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const token = req.cookies?.chatNationToken;
	if (!token) {
		return next(new ErrorHandler("Please login to access this resource", 401));
	}

	const data: any = verify(token, String(process.env.JWT_SECRET));
	if (!data) {
		return next(new ErrorHandler("User not found", 404));
	}
	res.locals.user = await User.findById(data.id!);

	next();
});

export default isUserAuthenticated;
