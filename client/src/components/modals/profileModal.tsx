import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { ChatState } from "../../state";
import { putRequest, toastOptions, validateMail } from "../../utils";
import "react-toastify/dist/ReactToastify.css";

interface ProfileModalProps {
	setShowUserProfileModal: Dispatch<SetStateAction<boolean>>;
}

const ProfileModal = ({ setShowUserProfileModal }: ProfileModalProps) => {
	const { user, setUser } = ChatState();
	const [update, setUpdate] = useState<boolean>(false);
	const [values, setValues] = useState<{ name: string; email: string }>({
		name: user.name,
		email: user.email,
	});
	const [pic, setPic] = useState<string>("");
	const [deletePic, setDeletePic] = useState<boolean>(false);
	const [changeInProfile, setChangeInProfile] = useState<boolean>(false);

	const submitUpdatedUser = async (e: FormEvent) => {
		e.preventDefault();

		if (
			values.name === user.name &&
			values.email === user.email &&
			!changeInProfile &&
			!deletePic
		) {
			return;
		}
		if (!values.name || !values.email) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}
		if (!validateMail(values.email)) {
			toast.warn("Please enter a valid e-mail Id", toastOptions);
			return;
		}

		try {
			const data = await putRequest(`/user/update/${user._id}`, {
				name: values.name,
				email: values.email,
				pic,
				deletePicture: deletePic,
			});

			if (data?.success) {
				toast.success(data.message, toastOptions);
				setUser(data.user);
				setUpdate(prev => false);
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

		setChangeInProfile(prev => true);
	};

	return (
		<main className="min-h-screen fixed z-30 inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center px-4">
			<section className="w-full max-w-[25em] sm:max-w-[31.25em] bg-primary px-6 sm:px-8 py-10 rounded-md">
				{update ? (
					<form onSubmit={submitUpdatedUser}>
						<h1 className="text-center mb-4">Update Profile</h1>
						<input
							type="name"
							id="name"
							name="name"
							className="form_input mb-4"
							value={values.name}
							onChange={handleInputChange}
							placeholder="Enter new name"
						/>
						<input
							type="email"
							id="email"
							name="email"
							className="form_input"
							value={values.email}
							onChange={handleInputChange}
							placeholder="Enter new email ID"
						/>
						<div className="input_container">
							<label htmlFor="pic">Edit Profile Picture</label>
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
						<div className="my-6 flex items-center gap-2">
							<AiTwotoneDelete
								size={30}
								className="text-secondary cursor-pointer"
								onClick={() => setDeletePic(prev => true)}
							/>
							<p>Delete profile picture</p>
						</div>
						<button type="submit" className="form_button mt-12">
							Set
						</button>
						<button
							type="button"
							className="secondary_button mt-2"
							onClick={() => setUpdate(prev => false)}
						>
							Cancel
						</button>
					</form>
				) : (
					<>
						<h1 className="text-center">{user.name}</h1>
						<p className="description text-tertiary text-center">{user.email}</p>
						{user.pic ? (
							<div className="flex items-center justify-center mt-8 mb-2">
								<img src={user.pic} alt={user.name} className="rounded-md w-40" />
							</div>
						) : (
							<FaUserCircle size={80} className="mx-auto mt-6" />
						)}
						<div>
							<button
								type="button"
								className="form_button mt-8"
								onClick={() => setUpdate(prev => true)}
							>
								Update
							</button>
							<button
								type="button"
								className="secondary_button mt-1"
								onClick={() => setShowUserProfileModal(prev => false)}
							>
								Close
							</button>
						</div>
					</>
				)}
			</section>
			<ToastContainer />
		</main>
	);
};

export default ProfileModal;
