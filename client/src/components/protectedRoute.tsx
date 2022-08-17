import { ReactNode, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ChatState, UserType } from "../state";
import { getRequest } from "../utils";

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const navigate: NavigateFunction = useNavigate();
	const { setUser } = ChatState();

	useEffect(() => {
		getRequest("/user")
			.then(res => {
				if (res?.success) {
					setUser(res.user);
					navigate("/", { replace: true });
				} else {
					setUser({} as UserType);
					navigate("/login", { replace: true });
				}
			})
			.catch(err => {
				setUser({} as UserType);
				navigate("/login", { replace: true });
			});
	}, [navigate]);

	return <>{children}</>;
};

export default ProtectedRoute;
