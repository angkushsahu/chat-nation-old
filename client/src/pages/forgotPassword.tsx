import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Loading } from "../components";
import { postRequest, toastOptions, validateMail } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const handleForgotPassword = async (e: FormEvent) => {
		e.preventDefault();

		if (!email) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}

		if (!validateMail(email)) {
			toast.warn("Please enter a valid e-mail Id", toastOptions);
			return;
		}

		try {
			setLoading(prev => true);
			const data = await postRequest("/user/forgot-password", { email });

			setLoading(prev => false);
			if (data?.success) {
				toast.success(data.message, toastOptions);
				setEmail(prev => "");
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
		setLoading(prev => false);
	};

	return (
		<>
			{loading ? (
				<main className="min-h-screen flex items-center justify-center">
					<Loading />
				</main>
			) : (
				<main className="bg-tertiary min-h-screen flex flex-col items-center justify-center p-4">
					<section className="bg-primary rounded-md w-full max-w-md">
						<form onSubmit={handleForgotPassword} className="p-6">
							<h1 className="text-center mb-6">Forgot Password</h1>
							<div className="input_container">
								<label htmlFor="email"></label>
								<input
									type="email"
									name="email"
									id="email"
									className="form_input"
									value={email}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setEmail(prev => e.target.value)
									}
									placeholder="Enter your email"
								/>
							</div>
							<button type="submit" className="form_button">
								Submit
							</button>
						</form>
					</section>
				</main>
			)}
			<ToastContainer />
		</>
	);
};

export default ForgotPassword;
