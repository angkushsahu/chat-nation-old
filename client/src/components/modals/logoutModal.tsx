import { Dispatch, SetStateAction } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getRequest, toastOptions } from "../../utils";
import "react-toastify/dist/ReactToastify.css";

interface LogoutModalProps {
	setShowModal: Dispatch<SetStateAction<boolean>>;
}

const LogoutModal = ({ setShowModal }: LogoutModalProps) => {
	const navigate: NavigateFunction = useNavigate();

	const handleLogout = async () => {
		try {
			const data = await getRequest("/user/logout");

			if (data?.success) {
				navigate("/login", { replace: true });
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
	};

	return (
		<main className="px-4 min-h-screen fixed z-30 inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center">
			<section className="bg-primary px-6 sm:px-8 py-10 rounded-md">
				<p className="description text-secondary text-center">
					Are you sure you want to logout ?
				</p>
				<div className="flex items-center gap-4 mt-6">
					<button type="button" className="form_button" onClick={handleLogout}>
						Yes
					</button>
					<button
						type="button"
						className="secondary_button"
						onClick={() => setShowModal(prev => false)}
					>
						No
					</button>
				</div>
			</section>
			<ToastContainer />
		</main>
	);
};

export default LogoutModal;
