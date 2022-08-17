import { NextFunction, Request, Response } from "express";
import { cloudinaryConfig } from "../utils";
import crypto from "crypto";
import { catchAsyncErrors } from "../middlewares";
import { User } from "../models";
import { ErrorHandler, sendResetEmail, sendToken, validateEmail } from "../utils";

export const userSignup = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const {
			name,
			email,
			password,
			pic,
		}: { name: string; email: string; password: string; pic: string } = req.body;

		let setPic: string = "";
		let setPublicUrl: string = "";
		if (pic) {
			const uploadImage = await cloudinaryConfig.uploader.upload(pic, {
				folder: "chat-nation",
				use_filename: true,
			});
			setPic = uploadImage.secure_url;
			setPublicUrl = uploadImage.public_id;
		}

		if (!name || !email || !password) {
			return next(new ErrorHandler("Please validate all the fields", 400));
		}
		if (!validateEmail(email)) {
			return next(new ErrorHandler("Please enter a valid e-mail ID", 400));
		}
		const user = await User.findOne({ email });
		if (user) {
			return next(new ErrorHandler("User already exists, login instead", 400));
		}

		const newUser = await User.create({
			name,
			email,
			password,
			pic: setPic,
			publicUrl: setPublicUrl,
		});
		if (!newUser) {
			return next(
				new ErrorHandler("Unable to create new user account, please try again later", 500),
			);
		}

		sendToken(res, newUser, 201, "User Signup successful");
	},
);

export const userLogin = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password }: { email: string; password: string } = req.body;

		if (!email || !password) {
			return next(new ErrorHandler("Please validate all the fields", 400));
		}
		if (!validateEmail(email)) {
			return next(new ErrorHandler("Please enter a valid e-mail ID", 400));
		}
		const user = await User.findOne({ email });
		if (!user) {
			return next(new ErrorHandler("Enter valid credentials", 404));
		}

		const comparePasswordResult: boolean = await user.comparePassword(password);
		if (!comparePasswordResult) {
			return next(new ErrorHandler("Enter valid credentials", 404));
		}

		sendToken(res, user, 200, "User Login successful");
	},
);

export const getAllUsers = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const keyword = req.query.search
			? {
					$or: [
						{ name: { $regex: req.query.search, $options: "i" } },
						{ email: { $regex: req.query.search, $options: "i" } },
					],
			  }
			: {};

		const users = await User.find(keyword)
			.find({ _id: { $ne: res.locals.user.id } })
			.select("name email pic");

		res.status(200).json({
			success: true,
			message: "Found all users successfully",
			users,
		});
	},
);

export const getUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user?.getUser() || null;

	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}

	res.status(200).json({
		success: true,
		message: "You are authenticated",
		user,
	});
});

export const updateUser = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const { name, email, pic, deletePicture } = req.body;
		let user = res.locals.user;

		if (user._id.toString() !== id) {
			return next(
				new ErrorHandler("Request cannot be completed as token is not matching", 400),
			);
		}
		if (!validateEmail(email)) {
			return next(new ErrorHandler("Please enter a valid e-mail ID", 400));
		}

		if (pic) {
			if (user.publicUrl) {
				await cloudinaryConfig.uploader.destroy(user.publicUrl);
			}
			const uploadImage = await cloudinaryConfig.uploader.upload(pic, {
				folder: "chat-nation",
				use_filename: true,
			});
			user = await User.findByIdAndUpdate(
				id,
				{
					name,
					email,
					pic: uploadImage.secure_url,
					publicUrl: uploadImage.public_id,
				},
				{
					new: true,
					runValidators: true,
					useFindAndModify: false,
				},
			);
		} else if (deletePicture) {
			await cloudinaryConfig.uploader.destroy(user.publicUrl);
			user = await User.findByIdAndUpdate(
				id,
				{ name, email, pic: "", publicUrl: "" },
				{
					new: true,
					runValidators: true,
					useFindAndModify: false,
				},
			);
		} else {
			user = await User.findByIdAndUpdate(
				id,
				{ name, email },
				{
					new: true,
					runValidators: true,
					useFindAndModify: false,
				},
			);
		}

		res.status(200).json({
			success: true,
			message: "User profile updated successfully",
			user: user.getUser(),
		});
	},
);

export const userLogout = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		res.clearCookie("chatNationToken");

		res.status(200).json({
			success: true,
			message: "User logged out successfully",
		});
	},
);

export const forgotPassword = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.body;
		if (!validateEmail(email)) {
			return next(new ErrorHandler("Please enter a valid e-mail ID", 400));
		}

		const user = await User.findOne({ email });
		if (!user) {
			return next(
				new ErrorHandler("No user with this e-mail ID exists in our database", 404),
			);
		}

		const resetToken: string = user.getResetPasswordToken();
		const { success, message } = await sendResetEmail(email, resetToken); // sending mail to the client
		if (!success) {
			return next(new ErrorHandler(message, 500));
		}
		await user.save();

		res.status(200).json({
			success: true,
			message:
				"Password reset token has been sent to this e-mail ID, please check your e-mail",
		});
	},
);

export const resetPassword = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id, password } = req.body;

		const newId = crypto.createHash("sha256").update(id).digest("hex");
		const user = await User.findOne({ resetPassword: newId });
		if (!user) {
			return next(new ErrorHandler("User not found", 404));
		}

		user.password = password;
		user.resetPassword = "";
		await user.save();

		res.status(200).json({
			success: true,
			message: "Password updated successfully",
		});
	},
);
