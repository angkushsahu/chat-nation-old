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
const fa_1 = require("react-icons/fa");
const gr_1 = require("react-icons/gr");
const loading_1 = __importDefault(require("../loading"));
const state_1 = require("../../state");
const utils_1 = require("../../utils");
const newGroupModal_1 = __importDefault(require("../modals/newGroupModal"));
require("react-toastify/dist/ReactToastify.css");
const ContactPage = () => {
    const { user, chats, setChats, selectedChat, setSelectedChat } = (0, state_1.ChatState)();
    const [groupModal, setGroupModal] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [loggedUser, setLoggedUser] = (0, react_1.useState)({});
    const fetchChats = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield (0, utils_1.getRequest)("/chat/fetch-chats");
            if (data.success) {
                setChats(data.chatsWithLatestMessageSender);
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
        fetchChats();
        setLoggedUser(user);
    }, [user]);
    return (<>
			{groupModal ? (<newGroupModal_1.default setGroupModal={setGroupModal}/>) : (<aside className={`px-8 py-4 ${selectedChat ? "hidden" : "block"} w-full lg:w-fit lg:block`}>
					{loading ? (<div className="flex items-center justify-center">
							<loading_1.default />
						</div>) : (<>
							<div className="flex items-center justify-between gap-8">
								<div>
									<h2>{user.name}</h2>
								</div>
								<button type="button" className="form_button flex gap-2 items-center w-fit px-2 py-1 text-xs sm:text-base" onClick={() => setGroupModal(prev => true)}>
									<gr_1.GrAdd size={15}/>
									<span>New Group</span>
								</button>
							</div>
							<section className="mt-6 pb-96 h-[calc(100%-6.5em)] flex flex-col gap-4 overflow-y-scroll no_scrollbars">
								{chats.map(chat => (<div className={`flex gap-2 items-center hover:bg-userHoverBackground duration-300 transition-colors rounded-md p-4 cursor-pointer group ${chat === selectedChat
                        ? "bg-userHoverBackground"
                        : "bg-primary"}`} key={chat._id} onClick={() => setSelectedChat(chat)}>
										{(0, utils_1.getSenderPicture)(user, chat.users) && !chat.isGroupChat ? (<img src={(0, utils_1.getSenderPicture)(user, chat.users)} alt={(0, utils_1.getSenderName)(user, chat.users)} className="w-10 h-10" style={{ clipPath: "circle(50% at 50% 50%)" }}/>) : (<fa_1.FaUserCircle size={40} className={`cursor-pointer group-hover:text-primary ${chat === selectedChat
                            ? "text-primary"
                            : "text-secondary"}`}/>)}
										<div>
											<p className={`font-js_semi font-bold group-hover:text-black ${chat === selectedChat
                        ? "text-primary"
                        : "text-secondary"}`}>
												{chat.isGroupChat
                        ? chat.chatName
                        : (0, utils_1.getSenderName)(loggedUser, chat.users)}
											</p>
											<p className={`description text-sm group-hover:text-primary ${chat === selectedChat
                        ? "text-primary"
                        : "text-tertiary"}`}>
												hello there
											</p>
										</div>
									</div>))}
							</section>
						</>)}
					<react_toastify_1.ToastContainer />
				</aside>)}
		</>);
};
exports.default = ContactPage;
