import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { UpdateModalProps } from "..";
import { ChatState, SelectedChatType, UserType } from "../../../../state";
import { getRequest, postRequest, putRequest, toastOptions } from "../../../../utils";
import Loading from "../../../loading";

interface AdminUpdateModalProps {
	setUpdateGroupModal: Dispatch<SetStateAction<boolean>>;
	selectedChat: SelectedChatType | null;
	setSelectedChat: Dispatch<SelectedChatType | null>;
	setUpdateLoading: Dispatch<SetStateAction<boolean>>;
	updateLoading: boolean;
}

const GroupAdminModal = ({
	setUpdateGroupModal,
	selectedChat,
	setSelectedChat,
	updateLoading,
	setUpdateLoading,
}: AdminUpdateModalProps) => {
	const { user, setChats } = ChatState();
	const [chatName, setChatName] = useState<string>(selectedChat?.chatName || "");
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [searchResult, setSearchResult] = useState<UserType[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<UserType[]>(selectedChat?.users || []);

	const fetchChats = async () => {
		try {
			const data = await getRequest("/chat/fetch-chats");

			if (data.success) {
				setChats(data.chatsWithLatestMessageSender);
			} else {
				toast.error(data.message!, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
	};

	const renameGroup = async () => {
		if (selectedChat?.chatName === chatName) {
			return;
		}
		if (selectedChat?.groupAdmin._id !== user._id) {
			toast.error("Only admin can add members to this group", toastOptions);
			return;
		}

		try {
			const data = await putRequest("/chat/rename-group", {
				chatId: selectedChat?._id,
				chatName,
			});

			if (data.success) {
				toast.success(data.message, toastOptions);
				setSelectedChat({ ...selectedChat!, chatName });
				await fetchChats();
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
	};

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

	const addMembersToChat = async (userOne: UserType) => {
		if (selectedChat?.users.find(user => user._id === userOne._id)) {
			toast.warn("User already is a part of this group", toastOptions);
			return;
		}

		if (selectedChat?.groupAdmin._id !== user._id) {
			toast.error("Only admin can add members to this group", toastOptions);
			return;
		}

		try {
			setUpdateLoading(prev => true);
			const data = await postRequest("/chat/add-to-group", {
				chatId: selectedChat._id,
				userId: userOne._id,
			});

			setUpdateLoading(prev => false);
			if (data.success) {
				setSelectedChat({ ...selectedChat!, users: [...selectedChat.users, userOne] });
				setSelectedUsers([...selectedUsers, userOne]);
				await fetchChats();
				toast.success(data.message, toastOptions);
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
	};

	const removeMembersFromChat = async (userOne: UserType) => {
		if (selectedChat?.groupAdmin._id !== user._id && userOne._id !== user._id) {
			toast.error("Only admin can delete members from this group", toastOptions);
			return;
		}

		try {
			setUpdateLoading(prev => true);
			const data = await postRequest("/chat/remove-from-group", {
				chatId: selectedChat?._id,
				userId: userOne._id,
			});

			setUpdateLoading(prev => false);
			if (data.success) {
				const updatedChatUserList = selectedChat?.users.filter(
					user => user._id !== userOne._id,
				);
				setSelectedChat({ ...selectedChat!, users: updatedChatUserList! });
				const updatedSelectedUsers = selectedUsers.filter(
					selectedUser => selectedUser._id !== userOne._id,
				);
				setSelectedUsers(updatedSelectedUsers);
				await fetchChats();
				toast.success(data.message, toastOptions);
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
	};

	useEffect(() => {
		fetchChats();
	}, []);

	return (
		<>
			<h1 className="text-center">Update Group</h1>
			<div className="input_container relative">
				<input
					type="text"
					className="form_input pr-28"
					placeholder="Chat Name"
					value={chatName}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setChatName(e.target.value)}
					required
				/>
				<button
					className="form_button absolute w-fit px-4 py-1 my-0 right-1 top-1 bottom-1"
					type="button"
					onClick={renameGroup}
				>
					Update
				</button>
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
				{selectedUsers.map((user, idx) => (
					<span
						className="px-2 py-1 bg-secondary text-primary rounded-xl flex items-center gap-1"
						key={idx}
					>
						<MdOutlineCancel
							size={20}
							className="text-primary cursor-pointer"
							onClick={() => removeMembersFromChat(user)}
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
					searchResult.slice(0, 3).map((user, idx) => (
						<>
							<div
								className="flex gap-2 items-center bg-primary hover:bg-userHoverBackground duration-300 transition-colors rounded-md p-4 cursor-pointer group"
								key={idx}
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
							<button
								className="form_button block px-4 ml-auto w-32"
								type="button"
								onClick={() => addMembersToChat(user)}
							>
								Add
							</button>
						</>
					))
				)}
			</div>
			<button
				className="secondary_button block px-4 ml-auto w-32"
				type="button"
				onClick={() => setUpdateGroupModal(prev => false)}
			>
				Cancel
			</button>
			<ToastContainer />
		</>
	);
};

export default GroupAdminModal;
