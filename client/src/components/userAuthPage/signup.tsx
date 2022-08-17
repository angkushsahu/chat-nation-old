import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BiShow, BiHide } from "react-icons/bi";
import { AuthState } from "../../pages/userAuth";
import { postRequest, toastOptions, validateMail } from "../../utils";
import { ChatState } from "../../state";
import "react-toastify/dist/ReactToastify.css";

interface SignupProps {
	setAuthState: Dispatch<SetStateAction<number>>;
}

interface SignupInputValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Signup = ({ setAuthState }: SignupProps) => {
	const [values, setValues] = useState<SignupInputValues>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
	const [pic, setPic] = useState<string>("");
	const navigate: NavigateFunction = useNavigate();
	const { setUser } = ChatState();

	const handleSignupSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!values.name || !values.email || !values.password || !values.confirmPassword) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}
		if (!validateMail(values.email)) {
			toast.warn("Please enter a valid e-mail Id", toastOptions);
			return;
		}
		if (values.confirmPassword !== values.password) {
			toast.warn("Password fields should match", toastOptions);
			return;
		}

		try {
			const data = await postRequest("/user/signup", {
				name: values.name,
				email: values.email,
				password: values.password,
				pic,
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

	const postDetails = (e: ChangeEvent<HTMLInputElement>) => {
		const imageFile = e.target.files![0];

		if (!imageFile) {
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(imageFile);
		reader.onloadend = () => {
			setPic(prev => String(reader.result));
		};
	};

	return (
		<form onSubmit={handleSignupSubmit} className="p-6">
			<h1 className="text-center mb-6">Signup</h1>
			<div className="input_container">
				<label htmlFor="name"></label>
				<input
					type="text"
					name="name"
					id="name"
					className="form_input"
					value={values.name}
					onChange={handleInputChange}
					placeholder="Enter your name"
				/>
			</div>
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
			<div className="input_container">
				<label htmlFor="pic"></label>
				<input
					type="file"
					accept="image/*"
					name="pic"
					id="pic"
					className="form_input"
					onChange={postDetails}
					placeholder="Enter your pic"
				/>
			</div>
			<button type="submit" className="form_button">
				Signup
			</button>
			<div className="flex flex-col justify-center">
				<p
					className="w-fit mx-auto text-center mt-4 cursor-pointer transition-colors hover:text-tertiary"
					onClick={() => setAuthState(prevVal => AuthState.LOGIN)}
				>
					Login instead
				</p>
			</div>
			<ToastContainer />
		</form>
	);
};

export default Signup;
