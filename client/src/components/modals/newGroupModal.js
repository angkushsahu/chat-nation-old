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
const md_1 = require("react-icons/md");
const state_1 = require("../../state");
const utils_1 = require("../../utils");
const loading_1 = __importDefault(require("../loading"));
require("react-toastify/dist/ReactToastify.css");
const NewGroupModal = ({ setGroupModal }) => {
    const { user, chats, setChats } = (0, state_1.ChatState)();
    const [chatName, setChatName] = (0, react_1.useState)("");
    const [selectedUsers, setSelectedUsers] = (0, react_1.useState)([]);
    const [search, setSearch] = (0, react_1.useState)("");
    const [searchResult, setSearchResult] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSearch = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const query = e.target.value;
        setSearch(prev => query);
        if (!query) {
            return;
        }
        try {
            setLoading(prev => true);
            const data = yield (0, utils_1.getRequest)(`/user/get-all-users?search=${query}`);
            setSearchResult(data.users);
            setLoading(prev => false);
        }
        catch (err) {
            console.error(err.message);
        }
    });
    const removeUserFromSelectedState = (user) => {
        const updatedSelectedUsers = selectedUsers.filter(selectedUser => selectedUser._id !== user._id);
        setSelectedUsers(updatedSelectedUsers);
    };
    const createChat = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!chatName || !selectedUsers) {
            react_toastify_1.toast.warn("Please validate all the fields", utils_1.toastOptions);
            return;
        }
        try {
            const data = yield (0, utils_1.postRequest)("/chat/create-group", {
                name: chatName,
                users: selectedUsers,
            });
            if (data.success) {
                react_toastify_1.toast.success(data.message, utils_1.toastOptions);
                setGroupModal(prev => false);
                setChats([data.groupChat, ...chats]);
            }
            else {
                react_toastify_1.toast.error(data.message, utils_1.toastOptions);
            }
        }
        catch (err) {
            react_toastify_1.toast.error(err.message, utils_1.toastOptions);
        }
    });
    return (<main className="px-4 min-h-screen fixed z-30 inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center">
			<section className="w-full max-w-[25em] sm:max-w-[31.25em] bg-primary px-6 sm:px-8 py-10 rounded-md">
				<h1 className="text-center">New Group</h1>
				<div className="input_container">
					<input type="text" className="form_input" placeholder="Chat Name" value={chatName} onChange={(e) => setChatName(e.target.value)} required/>
				</div>
				<div className="input_container">
					<input type="text" className="form_input" placeholder="Add Users" value={search} onChange={handleSearch}/>
				</div>
				<div className="my-6 flex flex-wrap items-center justify-center gap-4">
					{selectedUsers.map(user => (<span className="px-2 py-1 bg-secondary text-primary rounded-xl flex items-center gap-1" key={user._id}>
							<md_1.MdOutlineCancel size={20} className="text-primary cursor-pointer" onClick={() => removeUserFromSelectedState(user)}/>
							<span>{user.name}</span>
						</span>))}
				</div>
				<div className="my-6">
					{loading ? (<div className="flex items-center justify-center">
							<loading_1.default />
						</div>) : (searchResult.slice(0, 3).map(user => (<div className="flex gap-2 items-center bg-primary hover:bg-userHoverBackground duration-300 transition-colors rounded-md p-4 cursor-pointer group" key={user._id} onClick={() => setSelectedUsers([...selectedUsers, user])}>
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
				</div>
				<button className="form_button block px-4 ml-auto w-32" type="button" onClick={createChat}>
					Create Chat
				</button>
				<button className="secondary_button block px-4 ml-auto w-32" type="button" onClick={() => setGroupModal(prev => false)}>
					Cancel
				</button>
			</section>
			<react_toastify_1.ToastContainer />
		</main>);
};
exports.default = NewGroupModal;
