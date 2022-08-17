import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BiShow, BiHide } from "react-icons/bi";
import { AuthState } from "../../pages/userAuth";
import { postRequest, toastOptions, validateMail } from "../../utils";
import { ChatState } from "../../state";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
	setAuthState: Dispatch<SetStateAction<number>>;
}

interface LoginInputValues {
	email: string;
	password: string;
}

const Login = ({ setAuthState }: LoginProps) => {
	const [values, setValues] = useState<LoginInputValues>({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const navigate: NavigateFunction = useNavigate();
	const { setUser } = ChatState();

	const handleLoginSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!values.email || !values.password) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}

		if (!validateMail(values.email)) {
			toast.warn("Please enter a valid e-mail Id", toastOptions);
			return;
		}

		try {
			const data = await postRequest("/user/login", {
				email: values.email,
				password: values.password,
			});

			if (data?.success) {
				setUser(data.user!);
				navigate("/", { replace: true });
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
		<form onSubmit={handleLoginSubmit} className="p-6">
			<h1 className="text-center mb-6">Login</h1>
			<div className="input_container">
				<label htmlFor="email"></label>
				<input
					type="email"
					name="email"
					id="email"
					className="form_input"
					value={values.email}
					onChange={handleInputChange}
					placeholder="Enter your email"
				/>
			</div>
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
			<button type="submit" className="form_button">
				Login
			</button>
			<div className="flex flex-col justify-center">
				<Link to="/forgot-password">
					<span className="transition-colors hover:text-tertiary">Forgot Password</span>
				</Link>
				<p
					className="w-fit mx-auto text-center mt-4 cursor-pointer text-secondary transition-colors hover:text-tertiary"
					onClick={() => setAuthState(prevVal => AuthState.SIGNUP)}
				>
					Don't have an account
				</p>
			</div>
			<ToastContainer />
		</form>
	);
};

export default Login;
