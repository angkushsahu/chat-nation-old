import { ChangeEvent, FormEvent, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { putRequest, toastOptions } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import { BiHide, BiShow } from "react-icons/bi";

interface ResetPasswordInputValues {
	password: string;
	confirmPassword: string;
}

const ResetPassword = () => {
	const [values, setValues] = useState<ResetPasswordInputValues>({
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const navigate: NavigateFunction = useNavigate();
	const { id } = useParams();

	const handleResetPassword = async (e: FormEvent) => {
		e.preventDefault();

		if (!values.password || !values.confirmPassword) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}
		if (values.confirmPassword !== values.password) {
			toast.warn("Password fields should match", toastOptions);
			return;
		}

		try {
			const data = await putRequest("/user/reset-password", {
				id,
				password: values.password,
			});

			if (data?.success) {
				toast.success(data.message, toastOptions);
				setTimeout(() => {
					navigate("/login");
				}, 3000);
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues(prevVal => {
			return { ...values, [e.target.name]: e.target.value };
		});
	};

	return (
		<main className="bg-tertiary min-h-screen flex flex-col items-center justify-center p-4">
			<section className="bg-primary rounded-md w-full max-w-md">
				<form onSubmit={handleResetPassword} className="p-6">
					<h1 className="text-center mb-6">Reset Password</h1>
					<div className="input_container password_container">
						<label htmlFor="password"></label>
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							className="form_input"
							value={values.password}
							onChange={handleInputChange}
							placeholder="Enter your password"
						/>
						{showPassword ? (
							<BiHide
								onClick={() => setShowPassword(prevVal => !prevVal)}
								className="cursor-pointer"
								size={20}
							/>
						) : (
							<BiShow
								onClick={() => setShowPassword(prevVal => !prevVal)}
								className="cursor-pointer"
								size={20}
							/>
						)}
					</div>
					<div className="input_container password_container">
						<label htmlFor="confirmPassword"></label>
						<input
							type={showConfirmPassword ? "text" : "password"}
							name="confirmPassword"
							id="confirmPassword"
							className="form_input"
							value={values.confirmPassword}
							onChange={handleInputChange}
							placeholder="Re-enter password"
						/>
						{showConfirmPassword ? (
							<BiHide
								onClick={() => setShowConfirmPassword(prevVal => !prevVal)}
								className="cursor-pointer"
								size={20}
							/>
						) : (
							<BiShow
								onClick={() => setShowConfirmPassword(prevVal => !prevVal)}
								className="cursor-pointer"
								size={20}
							/>
						)}
					</div>
					<button type="submit" className="form_button">
						Submit
					</button>
				</form>
			</section>
			<ToastContainer />
		</main>
	);
};

export default ResetPassword;
