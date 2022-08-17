import { FC } from "react";
import { Link } from "react-router-dom";
import errorImage from "../assets/images/error.png";

const Error: FC = () => {
	return (
		<main className="min-h-screen text-white flex flex-col items-center justify-center gap-6 p-4">
			<img src={errorImage} alt="error" width="450" />
			<h2 className="text-center text-white">This page does not exist</h2>
			<Link to="/" replace={true} className="mt-6 form_button w-fit px-8 py-4">
				Back to home
			</Link>
		</main>
	);
};

export default Error;
