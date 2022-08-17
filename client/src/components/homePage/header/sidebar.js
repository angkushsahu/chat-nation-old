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
const ai_1 = require("react-icons/ai");
const fa_1 = require("react-icons/fa");
const im_1 = require("react-icons/im");
const utils_1 = require("../../../utils");
const loading_1 = __importDefault(require("../../loading"));
const state_1 = require("../../../state");
require("react-toastify/dist/ReactToastify.css");
const Sidebar = ({ setShowSearch }) => {
    const { setSelectedChat, chats, setChats } = (0, state_1.ChatState)();
    const [search, setSearch] = (0, react_1.useState)("");
    const [users, setUsers] = (0, react_1.useState)([]);
    const [accessChatLoading, setAccessChatLoading] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSearchFilter = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!search) {
            react_toastify_1.toast.warn("Please enter something to search", Object.assign(Object.assign({}, utils_1.toastOptions), { position: "top-left" }));
            return;
        }
        try {
            setLoading(prev => true);
            const data = yield (0, utils_1.getRequest)(`/user/get-all-users?search=${search}`);
            setLoading(prev => false);
            if (data === null || data === void 0 ? void 0 : data.success) {
                setUsers(prev => data === null || data === void 0 ? void 0 : data.users);
            }
            else {
                react_toastify_1.toast.error(data.message, utils_1.toastOptions);
            }
        }
        catch (err) {
            react_toastify_1.toast.error(err.message, utils_1.toastOptions);
        }
        setLoading(prev => false);
    });
    const accessChat = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setAccessChatLoading(prev => true);
            const data = yield (0, utils_1.postRequest)("/chat/access-chat", { userId: id });
            setAccessChatLoading(prev => false);
            if (data.success) {
                setShowSearch(prev => false);
                setChats([...chats, data.fullchat]);
                setSelectedChat(data.fullchat);
            }
            else {
                react_toastify_1.toast.error(data.message, utils_1.toastOptions);
            }
        }
        catch (err) {
            react_toastify_1.toast.error(err.message, utils_1.toastOptions);
        }
    });
    return (<>
			{accessChatLoading ? (<main className="min-h-screen flex items-center justify-center">
					<loading_1.default />
				</main>) : (<aside className="fixed z-20 inset-0 bg-white/10 backdrop-blur-md">
					<section className="bg-secondary h-full w-fit p-6">
						<im_1.ImCross color="#1A1A40" className="cursor-pointer" onClick={() => setShowSearch(prev => false)}/>
						<p className="description text-primary mt-4 font-bold">Search User</p>
						<form className="flex items-center gap-2 mt-4" onSubmit={handleSearchFilter}>
							<input type="text" className="flex-1 bg-primary text-secondary rounded px-2 py-1 border-none outline-none" value={search} onChange={(e) => setSearch(prev => e.target.value)} autoComplete="off"/>
							<button className="bg-primary py-1 px-2 rounded cursor-pointer" type="submit">
								<ai_1.AiOutlineSearch color="#4FD3C4" size={23}/>
							</button>
						</form>
						<section className="mt-6 pb-96 h-full flex flex-col gap-4 overflow-y-scroll no_scrollbars">
							{loading ? (<div className="flex items-center justify-center">
									<loading_1.default />
								</div>) : (users.map(user => (<div className="flex gap-2 items-center bg-primary hover:bg-userHoverBackground duration-300 transition-colors rounded-md p-4 cursor-pointer group" key={user._id} onClick={() => accessChat(user._id)}>
										{user.pic ? (<img src={user.pic} alt={user.name} className="w-10"/>) : (<fa_1.FaUserCircle size={40} className="cursor-pointer text-secondary group-hover:text-primary"/>)}
										<div>
											<p className="font-js_semi text-secondary font-bold group-hover:text-black">
												{user.name}
											</p>
											<p className="description text-tertiary text-xs group-hover:text-primary">
												{user.email}
											</p>
										</div>
									</div>)))}
						</section>
					</section>
				</aside>)}
			<react_toastify_1.ToastContainer />
		</>);
};
exports.default = Sidebar;
