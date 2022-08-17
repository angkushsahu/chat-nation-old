import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { ChatState, UserType } from "../../state";
import { getRequest, postRequest, toastOptions } from "../../utils";
import Loading from "../loading";
import "react-toastify/dist/ReactToastify.css";

interface NewGroupModalProps {
	setGroupModal: Dispatch<SetStateAction<boolean>>;
}

const NewGroupModal = ({ setGroupModal }: NewGroupModalProps) => {
	const { user, chats, setChats } = ChatState();

	const [chatName, setChatName] = useState<string>("");
	const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
	const [search, setSearch] = useState<string>("");
	const [searchResult, setSearchResult] = useState<UserType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
		const query: string = e.target.value;
		setSearch(prev => query);
		if (!query) {
			return;
		}

		try {
			setLoading(prev => true);
			const data = await getRequest(`/user/get-all-users?search=${query}`);
			setSearchResult(data.users);
			setLoading(prev => false);
		} catch (err: any) {
			console.error(err.message!);
		}
	};

	const removeUserFromSelectedState = (user: UserType) => {
		const updatedSelectedUsers = selectedUsers.filter(
			selectedUser => selectedUser._id !== user._id,
		);
		setSelectedUsers(updatedSelectedUsers);
	};

	const createChat = async () => {
		if (!chatName || !selectedUsers) {
			toast.warn("Please validate all the fields", toastOptions);
			return;
		}

		try {
			const data = await postRequest("/chat/create-group", {
				name: chatName,
				users: selectedUsers,
			});

			if (data.success) {
				toast.success(data.message, toastOptions);
				setGroupModal(prev => false);
				setChats([data.groupChat, ...chats]);
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
	};

	return (
		<main className="px-4 min-h-screen fixed z-30 inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center">
			<section className="w-full max-w-[25em] sm:max-w-[31.25em] bg-primary px-6 sm:px-8 py-10 rounded-md">
				<h1 className="text-center">New Group</h1>
				<div className="input_container">
					<input
						type="text"
						className="form_input"
						placeholder="Chat Name"
						value={chatName}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setChatName(e.target.value)}
						required
					/>
				</div>
				<div className="input_container">
					<input
						type="text"
						className="form_input"
						placeholder="Add Users"
						value={search}
						onChange={handleSearch}
					/>
				</div>
				<div className="my-6 flex flex-wrap items-center justify-center gap-4">
					{selectedUsers.map(user => (
						<span
							className="px-2 py-1 bg-secondary text-primary rounded-xl flex items-center gap-1"
							key={user._id}
						>
							<MdOutlineCancel
								size={20}
								className="text-primary cursor-pointer"
								onClick={() => removeUserFromSelectedState(user)}
							/>
							<span>{user.name}</span>
						</span>
					))}
				</div>
				<div className="my-6">
					{loading ? (
						<div className="flex items-center justify-center">
							<Loading />
						</div>
					) : (
						searchResult.slice(0, 3).map(user => (
							<div
								className="flex gap-2 items-center bg-primary hover:bg-userHoverBackground duration-300 transition-colors rounded-md p-4 cursor-pointer group"
								key={user._id}
								onClick={() => setSelectedUsers([...selectedUsers, user])}
							>
								{user.pic ? (
									<img src={user.pic} alt={user.name} className="w-10" />
								) : (
									<FaUserCircle
										size={40}
										className="cursor-pointer text-secondary group-hover:text-primary"
									/>
								)}
								<div>
									<p className="font-js_semi text-secondary font-bold group-hover:text-black">
										{user.name}
									</p>
									<p className="description text-tertiary text-xs group-hover:text-primary">
										{user.email}
									</p>
								</div>
							</div>
						))
					)}
				</div>
				<button
					className="form_button block px-4 ml-auto w-32"
					type="button"
					onClick={createChat}
				>
					Create Chat
				</button>
				<button
					className="secondary_button block px-4 ml-auto w-32"
					type="button"
					onClick={() => setGroupModal(prev => false)}
				>
					Cancel
				</button>
			</section>
			<ToastContainer />
		</main>
	);
};

export default NewGroupModal;
