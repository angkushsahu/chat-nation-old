import { useState } from "react";
import { Login, Signup } from "../components";

export enum AuthState {
	LOGIN,
	SIGNUP,
}

const UserAuth = () => {
	const [authState, setAuthState] = useState<number>(AuthState.LOGIN);

	return (
		<main className="bg-tertiary min-h-screen flex flex-col items-center justify-center p-4">
			<section className="bg-primary rounded-md w-full max-w-md">
				<div className="flex items-center justify-center">
					<span
						onClick={() => setAuthState(prevVal => AuthState.LOGIN)}
						className={`flex-1 text-center py-2 cursor-pointer font-bold rounded-tl-md border-2 border-tertiary transition-colors ${
							authState === AuthState.LOGIN
								? "bg-secondary text-primary"
								: "text-secondary"
						}`}
					>
						LOGIN
					</span>
					<span
						onClick={() => setAuthState(prevVal => AuthState.SIGNUP)}
						className={`flex-1 text-center py-2 cursor-pointer font-bold rounded-tr-md border-2 border-tertiary transition-colors ${
							authState === AuthState.SIGNUP
								? "bg-secondary text-primary"
								: "text-secondary"
						}`}
					>
						SIGNUP
					</span>
				</div>
				{authState === AuthState.SIGNUP ? (
					<Signup setAuthState={setAuthState} />
				) : (
					<Login setAuthState={setAuthState} />
				)}
			</section>
		</main>
	);
};

export default UserAuth;
