"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_toastify_1 = require("react-toastify");
const socket_io_client_1 = require("socket.io-client");
const emoji_picker_react_1 = __importDefault(require("emoji-picker-react"));
const bi_1 = require("react-icons/bi");
const io_1 = require("react-icons/io");
const bs_1 = require("react-icons/bs");
const im_1 = require("react-icons/im");
const utils_1 = require("../../utils");
const state_1 = require("../../state");
const updateGroupModal_1 = __importDefault(require("../modals/updateGroupModal"));
const welcome_gif_1 = __importDefault(require("../../assets/images/welcome.gif"));
require("react-toastify/dist/ReactToastify.css");
const END_POINT = "https://chat-nation.herokuapp.com";
let socket, selectedChatCompare;
const ChatPage = () => {
    var _a, _b;
    const { user, selectedChat, setSelectedChat, notification, setNotification } = (0, state_1.ChatState)();
    const [messageText, setMessageText] = (0, react_1.useState)("");
    const [updateGroupModal, setUpdateGroupModal] = (0, react_1.useState)(false);
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [socketConnected, setSocketConnected] = (0, react_1.useState)(false);
    const [typing, setTyping] = (0, react_1.useState)(false);
    const [isTyping, setIsTyping] = (0, react_1.useState)(false);
    const [showEmojiPicker, setShowEmojiPicker] = (0, react_1.useState)(false);
    const scrollToPointRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = scrollToPointRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
    }, [selectedChat]);
    (0, react_1.useEffect)(() => {
        socket = (0, socket_io_client_1.io)(END_POINT);
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
    const sendMessage = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const message = messageText.trim();
        socket.emit("stop typing", selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat._id);
        if (!message) {
            setMessageText("");
            return;
        }
        try {
            const data = yield (0, utils_1.postRequest)("/message/add-message", {
                chatId: selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat._id,
                content: message,
            });
            if (data.success) {
                socket.emit("new message", data.msg);
                setMessages([...messages, data.msg]);
                setMessageText("");
            }
            else {
                react_toastify_1.toast.error(data.message, utils_1.toastOptions);
            }
        }
        catch (err) {
            react_toastify_1.toast.error(err.message, utils_1.toastOptions);
        }
    });
    const fetchMessages = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!selectedChat) {
            return;
        }
        try {
            const data = yield (0, utils_1.getRequest)(`/message/fetch-messages/${selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat._id}`);
            if (data.success) {
                setMessages(data.msgs);
                socket.emit("join chat", selectedChat._id);
            }
            else {
                react_toastify_1.toast.error(data.message, utils_1.toastOptions);
            }
        }
        catch (err) {
            react_toastify_1.toast.error(err.message, utils_1.toastOptions);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);
    (0, react_1.useEffect)(() => {
        setNotification(notification.filter(note => note.chat._id !== (selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat._id)));
    }, [selectedChat]);
    const typingHandler = (e) => {
        setMessageText(e.target.value);
        if (!socketConnected) {
            return;
        }
        if (!typing) {
            setTyping(prev => true);
            socket.emit("typing", selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        const timerLength = 3000;
        setTimeout(() => {
            const timeNow = new Date().getTime();
            const timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat._id);
                setTyping(prev => false);
            }
        }, timerLength);
    };
    (0, react_1.useEffect)(() => {
        socket.on("message received", (newMessage) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {
                if (!notification.includes(newMessage)) {
                    setNotification([newMessage, ...notification]);
                    fetchMessages();
                }
            }
            else {
                setMessages([...messages, newMessage]);
            }
        });
    });
    const handleEmojiClick = (event, emoji) => {
        let message = messageText;
        message += emoji.emoji;
        setMessageText(message);
    };
    return (<>
			{selectedChat ? (<>
					{updateGroupModal ? (<updateGroupModal_1.default setUpdateGroupModal={setUpdateGroupModal} selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>) : (<section className={`flex-1 bg-tertiary relative z-0 ${selectedChat ? "block" : "hidden"} lg:block`}>
							<header className="bg-primary px-6 py-4 flex justify-between items-center">
								<div className="flex gap-6">
									<bi_1.BiArrowBack size={25} className="text-secondary cursor-pointer" onClick={() => setSelectedChat(null)}/>
									<h2>
										{selectedChat.isGroupChat
                    ? selectedChat.chatName
                    : (0, utils_1.getSenderName)(user, selectedChat.users)}
									</h2>
								</div>
								<bi_1.BiDotsVerticalRounded size={25} className="text-secondary cursor-pointer" onClick={() => setUpdateGroupModal(prev => true)}/>
							</header>
							<section className="relative px-3 sm:px-6 py-4 flex flex-col gap-4 h-[calc(100%-8.75em)] overflow-y-auto bg-gradient-to-r from-sky-700 to-indigo-800 no_scrollbars" style={{ scrollbarWidth: "none" }}>
								<bs_1.BsFillArrowDownCircleFill className="fixed bottom-24 cursor-pointer right-4 z-50 text-white" size={30} onClick={() => scrollToPointRef.current.scrollIntoView({
                    behavior: "smooth",
                })}/>
								{messages.map((message, idx) => (<div key={idx} className={`p-4 rounded-lg w-fit max-w-[90%] sm:max-w-[31.25em] ${message.sender._id === user._id
                        ? "ml-auto bg-secondary text-primary selection:bg-primary selection:text-white"
                        : "mr-auto bg-primary"}`}>
										{message.chat.isGroupChat &&
                        !(message.sender._id === user._id) && (<p className="description mb-2 font-bold text-secondary">
													{message.sender.name}
												</p>)}
										<p>{message.content}</p>
									</div>))}
								{isTyping ? (<div className={`p-4 rounded-lg w-fit max-w-[90%] sm:max-w-[31.25em] bg-gray-600 animate-[pulse_1s_ease-in-out_infinite] duration-100`}>
										typing . . . .
									</div>) : (<></>)}
								<div ref={scrollToPointRef}></div>
							</section>
							<section className="absolute bottom-0 right-0 left-0 bg-primary p-4 flex items-center">
								<form onSubmit={sendMessage} className="flex-1 flex items-center">
									{showEmojiPicker ? (<im_1.ImCross size={20} className="text-secondary inline absolute left-6 cursor-pointer" onClick={() => setShowEmojiPicker(prev => !prev)}/>) : (<bs_1.BsFillEmojiSmileFill size={25} className="text-secondary inline absolute left-6 cursor-pointer" onClick={() => setShowEmojiPicker(prev => !prev)}/>)}
									<input type="text" id="messageText" name="messageText" value={messageText} onChange={typingHandler} className="flex-1 form_input pl-12 pr-16" placeholder="Enter a message ....."/>
									{showEmojiPicker && <emoji_picker_react_1.default onEmojiClick={handleEmojiClick}/>}
									<button type="submit" className="px-4 py-1 bg-secondary rounded absolute right-5">
										<io_1.IoMdSend size={25} className="text-primary"/>
									</button>
								</form>
							</section>
						</section>)}
				</>) : (<section className={`flex-1 bg-gradient-to-r from-sky-700 to-indigo-800 flex-col items-center justify-center gap-6 z-0 hidden lg:flex`}>
					<img src={welcome_gif_1.default} alt="welcome" className="w-64 rounded-lg shadow-md shadow-black"/>
					<h1>Hello {(_a = user.name) === null || _a === void 0 ? void 0 : _a.substring(0, (_b = user.name) === null || _b === void 0 ? void 0 : _b.indexOf(" "))}</h1>
				</section>)}
			<react_toastify_1.ToastContainer />
		</>);
};
exports.default = ChatPage;
