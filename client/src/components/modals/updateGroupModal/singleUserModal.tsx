import { FaUserCircle } from "react-icons/fa";
import { UpdateModalProps } from ".";
import { ChatState } from "../../../state";
import { getSenderEmail, getSenderName, getSenderPicture } from "../../../utils";

const SingleUserModal = ({ setUpdateGroupModal, selectedChat }: UpdateModalProps) => {
	const { user } = ChatState();
	const senderPicture = getSenderPicture(user, selectedChat?.users!);
	const senderName = getSenderName(user, selectedChat?.users!);
	const senderEmail = getSenderEmail(user, selectedChat?.users!);

	return (
		<>
			<h1 className="text-center">{senderName}</h1>
			<p className="description text-tertiary text-center">{senderEmail}</p>
			{senderPicture ? (
				<div className="flex items-center justify-center mt-8 mb-2">
					<img src={senderPicture} alt={senderName} className="rounded-md w-40" />
				</div>
			) : (
				<FaUserCircle size={80} className="mx-auto mt-6" />
			)}
			<button
				className="secondary_button block px-4 ml-auto w-32"
				type="button"
				onClick={() => setUpdateGroupModal(prev => false)}
			>
				Cancel
			</button>
		</>
	);
};

export default SingleUserModal;
