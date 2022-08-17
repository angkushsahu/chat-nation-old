import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import Loading from "../loading";
import { ChatState, UserType } from "../../state";
import { getRequest, getSenderName, getSenderPicture, toastOptions } from "../../utils";
import NewGroupModal from "../modals/newGroupModal";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
	const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
	const [groupModal, setGroupModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [loggedUser, setLoggedUser] = useState<UserType>({} as UserType);

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

	useEffect(() => {
		fetchChats();
		setLoggedUser(user);
	}, [user]);

	return (
		<>
			{groupModal ? (
				<NewGroupModal setGroupModal={setGroupModal} />
			) : (
				<aside
					className={`px-8 py-4 ${
						selectedChat ? "hidden" : "block"
					} w-full lg:w-fit lg:block`}
				>
					{loading ? (
						<div className="flex items-center justify-center">
							<Loading />
						</div>
					) : (
						<>
							<div className="flex items-center justify-between gap-8">
								<div>
									<h2>{user.name}</h2>
								</div>
								<button
									type="button"
									className="form_button flex gap-2 items-center w-fit px-2 py-1 text-xs sm:text-base"
									onClick={() => setGroupModal(prev => true)}
								>
									<GrAdd size={15} />
									<span>New Group</span>
								</button>
							</div>
							<section className="mt-6 pb-96 h-[calc(100%-6.5em)] flex flex-col gap-4 overflow-y-scroll no_scrollbars">
								{chats.map(chat => (
									<div
										className={`flex gap-2 items-center hover:bg-userHoverBackground duration-300 transition-colors rounded-md p-4 cursor-pointer group ${
											chat === selectedChat
												? "bg-userHoverBackground"
												: "bg-primary"
										}`}
										key={chat._id}
										onClick={() => setSelectedChat(chat)}
									>
										{getSenderPicture(user, chat.users) && !chat.isGroupChat ? (
											<img
												src={getSenderPicture(user, chat.users)}
												alt={getSenderName(user, chat.users)}
												className="w-10 h-10"
												style={{ clipPath: "circle(50% at 50% 50%)" }}
											/>
										) : (
											<FaUserCircle
												size={40}
												className={`cursor-pointer group-hover:text-primary ${
													chat === selectedChat
														? "text-primary"
														: "text-secondary"
												}`}
											/>
										)}
										<div>
											<p
												className={`font-js_semi font-bold group-hover:text-black ${
													chat === selectedChat
														? "text-primary"
														: "text-secondary"
												}`}
											>
												{chat.isGroupChat
													? chat.chatName
													: getSenderName(loggedUser, chat.users)}
											</p>
											<p
												className={`description text-sm group-hover:text-primary ${
													chat === selectedChat
														? "text-primary"
														: "text-tertiary"
												}`}
											>
												hello there
											</p>
										</div>
									</div>
								))}
							</section>
						</>
					)}
					<ToastContainer />
				</aside>
			)}
		</>
	);
};

export default ContactPage;
