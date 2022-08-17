import {
	ChangeEvent,
	FormEvent,
	MouseEvent,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import { io, Socket } from "socket.io-client";
import Picker, { IEmojiData } from "emoji-picker-react";
import { BiArrowBack, BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { BsFillArrowDownCircleFill, BsFillEmojiSmileFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { getRequest, getSenderName, postRequest, toastOptions } from "../../utils";
import { ChatState, MessageTypes, SelectedChatType } from "../../state";
import UpdateGroupModal from "../modals/updateGroupModal";
import welcome from "../../assets/images/welcome.gif";
import "react-toastify/dist/ReactToastify.css";

const END_POINT = "https://chat-nation.herokuapp.com";
let socket: Socket, selectedChatCompare: SelectedChatType | null;

const ChatPage = () => {
	const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();
	const [messageText, setMessageText] = useState<string>("");
	const [updateGroupModal, setUpdateGroupModal] = useState<boolean>(false);
	const [messages, setMessages] = useState<MessageTypes[]>([]);
	const [socketConnected, setSocketConnected] = useState<boolean>(false);
	const [typing, setTyping] = useState<boolean>(false);
	const [isTyping, setIsTyping] = useState<boolean>(false);
	const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
	const scrollToPointRef: MutableRefObject<HTMLDivElement> =
		useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		scrollToPointRef.current?.scrollIntoView();
	}, [selectedChat]);

	useEffect(() => {
		socket = io(END_POINT);

		socket.emit("setup", user);
		socket.on("connected", () => {
			setSocketConnected(prev => true);
		});

		socket.on("typing", () => {
			setIsTyping(prev => true);
		});
		socket.on("stop typing", () => {
			setIsTyping(prev => false);
		});
	}, [messages]);

	const sendMessage = async (e: FormEvent) => {
		e.preventDefault();
		const message: string = messageText.trim();
		socket.emit("stop typing", selectedChat?._id);

		if (!message) {
			setMessageText("");
			return;
		}

		try {
			const data = await postRequest("/message/add-message", {
				chatId: selectedChat?._id,
				content: message,
			});

			if (data.success) {
				socket.emit("new message", data.msg);
				setMessages([...messages, data.msg]);
				setMessageText("");
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
	};

	const fetchMessages = async () => {
		if (!selectedChat) {
			return;
		}

		try {
			const data = await getRequest(`/message/fetch-messages/${selectedChat?._id}`);
			if (data.success) {
				setMessages(data.msgs);
				socket.emit("join chat", selectedChat._id);
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
	};

	useEffect(() => {
		fetchMessages();
		selectedChatCompare = selectedChat;
	}, [selectedChat]);

	useEffect(() => {
		setNotification(notification.filter(note => note.chat._id !== selectedChat?._id));
	}, [selectedChat]);

	const typingHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setMessageText(e.target.value);
		if (!socketConnected) {
			return;
		}
		if (!typing) {
			setTyping(prev => true);
			socket.emit("typing", selectedChat?._id);
		}

		let lastTypingTime = new Date().getTime();
		const timerLength = 3000;
		setTimeout(() => {
			const timeNow = new Date().getTime();
			const timeDiff = timeNow - lastTypingTime;

			if (timeDiff >= timerLength && typing) {
				socket.emit("stop typing", selectedChat?._id);
				setTyping(prev => false);
			}
		}, timerLength);
	};

	useEffect(() => {
		socket.on("message received", (newMessage: MessageTypes) => {
			if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
				if (!notification.includes(newMessage)) {
					setNotification([newMessage, ...notification]);
					fetchMessages();
				}
			} else {
				setMessages([...messages, newMessage]);
			}
		});
	});

	const handleEmojiClick = (
		event: MouseEvent<Element, globalThis.MouseEvent>,
		emoji: IEmojiData,
	) => {
		let message: string = messageText;
		message += emoji.emoji;
		setMessageText(message);
	};

	return (
		<>
			{selectedChat ? (
				<>
					{updateGroupModal ? (
						<UpdateGroupModal
							setUpdateGroupModal={setUpdateGroupModal}
							selectedChat={selectedChat}
							setSelectedChat={setSelectedChat}
						/>
					) : (
						<section
							className={`flex-1 bg-tertiary relative z-0 ${
								selectedChat ? "block" : "hidden"
							} lg:block`}
						>
							<header className="bg-primary px-6 py-4 flex justify-between items-center">
								<div className="flex gap-6">
									<BiArrowBack
										size={25}
										className="text-secondary cursor-pointer"
										onClick={() => setSelectedChat(null)}
									/>
									<h2>
										{selectedChat.isGroupChat
											? selectedChat.chatName
											: getSenderName(user, selectedChat.users)}
									</h2>
								</div>
								<BiDotsVerticalRounded
									size={25}
									className="text-secondary cursor-pointer"
									onClick={() => setUpdateGroupModal(prev => true)}
								/>
							</header>
							<section
								className="relative px-3 sm:px-6 py-4 flex flex-col gap-4 h-[calc(100%-8.75em)] overflow-y-auto bg-gradient-to-r from-sky-700 to-indigo-800 no_scrollbars"
								style={{ scrollbarWidth: "none" }}
							>
								<BsFillArrowDownCircleFill
									className="fixed bottom-24 cursor-pointer right-4 z-50 text-white"
									size={30}
									onClick={() =>
										scrollToPointRef.current.scrollIntoView({
											behavior: "smooth",
										})
									}
								/>
								{messages.map((message, idx) => (
									<div
										key={idx}
										className={`p-4 rounded-lg w-fit max-w-[90%] sm:max-w-[31.25em] ${
											message.sender._id === user._id
												? "ml-auto bg-secondary text-primary selection:bg-primary selection:text-white"
												: "mr-auto bg-primary"
										}`}
									>
										{message.chat.isGroupChat &&
											!(message.sender._id === user._id) && (
												<p className="description mb-2 font-bold text-secondary">
													{message.sender.name}
												</p>
											)}
										<p>{message.content}</p>
									</div>
								))}
								{isTyping ? (
									<div
										className={`p-4 rounded-lg w-fit max-w-[90%] sm:max-w-[31.25em] bg-gray-600 animate-[pulse_1s_ease-in-out_infinite] duration-100`}
									>
										typing . . . .
									</div>
								) : (
									<></>
								)}
								<div ref={scrollToPointRef}></div>
							</section>
							<section className="absolute bottom-0 right-0 left-0 bg-primary p-4 flex items-center">
								<form onSubmit={sendMessage} className="flex-1 flex items-center">
									{showEmojiPicker ? (
										<ImCross
											size={20}
											className="text-secondary inline absolute left-6 cursor-pointer"
											onClick={() => setShowEmojiPicker(prev => !prev)}
										/>
									) : (
										<BsFillEmojiSmileFill
											size={25}
											className="text-secondary inline absolute left-6 cursor-pointer"
											onClick={() => setShowEmojiPicker(prev => !prev)}
										/>
									)}
									<input
										type="text"
										id="messageText"
										name="messageText"
										value={messageText}
										onChange={typingHandler}
										className="flex-1 form_input pl-12 pr-16"
										placeholder="Enter a message ....."
									/>
									{showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
									<button
										type="submit"
										className="px-4 py-1 bg-secondary rounded absolute right-5"
									>
										<IoMdSend size={25} className="text-primary" />
									</button>
								</form>
							</section>
						</section>
					)}
				</>
			) : (
				<section
					className={`flex-1 bg-gradient-to-r from-sky-700 to-indigo-800 flex-col items-center justify-center gap-6 z-0 hidden lg:flex`}
				>
					<img
						src={welcome}
						alt="welcome"
						className="w-64 rounded-lg shadow-md shadow-black"
					/>
					<h1>Hello {user.name?.substring(0, user.name?.indexOf(" "))}</h1>
				</section>
			)}
			<ToastContainer />
		</>
	);
};

export default ChatPage;
