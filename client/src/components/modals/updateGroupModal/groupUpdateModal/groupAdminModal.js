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
const fa_1 = require("react-icons/fa");
const md_1 = require("react-icons/md");
const react_toastify_1 = require("react-toastify");
const state_1 = require("../../../../state");
const utils_1 = require("../../../../utils");
const loading_1 = __importDefault(require("../../../loading"));
const GroupAdminModal = ({ setUpdateGroupModal, selectedChat, setSelectedChat, updateLoading, setUpdateLoading, }) => {
    const { user, setChats } = (0, state_1.ChatState)();
    const [chatName, setChatName] = (0, react_1.useState)((selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.chatName) || "");
    const [search, setSearch] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [searchResult, setSearchResult] = (0, react_1.useState)([]);
    const [selectedUsers, setSelectedUsers] = (0, react_1.useState)((selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users) || []);
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
    const renameGroup = () => __awaiter(void 0, void 0, void 0, function* () {
        if ((selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.chatName) === chatName) {
            return;
        }
        if ((selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.groupAdmin._id) !== user._id) {
            react_toastify_1.toast.error("Only admin can add members to this group", utils_1.toastOptions);
            return;
        }
        try {
            const data = yield (0, utils_1.putRequest)("/chat/rename-group", {
                chatId: selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat._id,
                chatName,
            });
            if (data.success) {
                react_toastify_1.toast.success(data.message, utils_1.toastOptions);
                setSelectedChat(Object.assign(Object.assign({}, selectedChat), { chatName }));
                yield fetchChats();
            }
            else {
                react_toastify_1.toast.error(data.message, utils_1.toastOptions);
            }
        }
        catch (err) {
            react_toastify_1.toast.error(err.message, utils_1.toastOptions);
        }
    });
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
    const addMembersToChat = (userOne) => __awaiter(void 0, void 0, void 0, function* () {
        if (selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users.find(user => user._id === userOne._id)) {
            react_toastify_1.toast.warn("User already is a part of this group", utils_1.toastOptions);
            return;
        }
        if ((selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.groupAdmin._id) !== user._id) {
            react_toastify_1.toast.error("Only admin can add members to this group", utils_1.toastOptions);
            return;
        }
        try {
            setUpdateLoading(prev => true);
            const data = yield (0, utils_1.postRequest)("/chat/add-to-group", {
                chatId: selectedChat._id,
                userId: userOne._id,
            });
            setUpdateLoading(prev => false);
            if (data.success) {
                setSelectedChat(Object.assign(Object.assign({}, selectedChat), { users: [...selectedChat.users, userOne] }));
                setSelectedUsers([...selectedUsers, userOne]);
                yield fetchChats();
                react_toastify_1.toast.success(data.message, utils_1.toastOptions);
            }
            else {
                react_toastify_1.toast.error(data.message, utils_1.toastOptions);
            }
        }
        catch (err) {
            react_toastify_1.toast.error(err.message, utils_1.toastOptions);
        }
    });
    const removeMembersFromChat = (userOne) => __awaiter(void 0, void 0, void 0, function* () {
        if ((selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.groupAdmin._id) !== user._id && userOne._id !== user._id) {
            react_toastify_1.toast.error("Only admin can delete members from this group", utils_1.toastOptions);
            return;
        }
        try {
            setUpdateLoading(prev => true);
            const data = yield (0, utils_1.postRequest)("/chat/remove-from-group", {
                chatId: selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat._id,
                userId: userOne._id,
            });
            setUpdateLoading(prev => false);
            if (data.success) {
                const updatedChatUserList = selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users.filter(user => user._id !== userOne._id);
                setSelectedChat(Object.assign(Object.assign({}, selectedChat), { users: updatedChatUserList }));
                const updatedSelectedUsers = selectedUsers.filter(selectedUser => selectedUser._id !== userOne._id);
                setSelectedUsers(updatedSelectedUsers);
                yield fetchChats();
                react_toastify_1.toast.success(data.message, utils_1.toastOptions);
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
    }, []);
    return (<>
			<h1 className="text-center">Update Group</h1>
			<div className="input_container relative">
				<input type="text" className="form_input pr-28" placeholder="Chat Name" value={chatName} onChange={(e) => setChatName(e.target.value)} required/>
				<button className="form_button absolute w-fit px-4 py-1 my-0 right-1 top-1 bottom-1" type="button" onClick={renameGroup}>
					Update
				</button>
			</div>
			<div className="input_container">
				<input type="text" className="form_input" placeholder="Add Users" value={search} onChange={handleSearch}/>
			</div>
			<div className="my-6 flex flex-wrap items-center justify-center gap-4">
				{selectedUsers.map((user, idx) => (<span className="px-2 py-1 bg-secondary text-primary rounded-xl flex items-center gap-1" key={idx}>
						<md_1.MdOutlineCancel size={20} className="text-primary cursor-pointer" onClick={() => removeMembersFromChat(user)}/>
						<span>{user.name}</span>
					</span>))}
			</div>
			<div className="my-6">
				{loading ? (<div className="flex items-center justify-center">
						<loading_1.default />
					</div>) : (searchResult.slice(0, 3).map((user, idx) => (<>
							<div className="flex gap-2 items-center bg-primary hover:bg-userHoverBackground duration-300 transition-colors rounded-md p-4 cursor-pointer group" key={idx} onClick={() => setSelectedUsers([...selectedUsers, user])}>
								{user.pic ? (<img src={user.pic} alt={user.name} className="w-10"/>) : (<fa_1.FaUserCircle size={40} className="cursor-pointer text-secondary group-hover:text-primary"/>)}
								<div>
									<p className="font-js_semi text-secondary font-bold group-hover:text-black">
										{user.name}
									</p>
									<p className="description text-tertiary text-xs group-hover:text-primary">
										{user.email}
									</p>
								</div>
							</div>
							<button className="form_button block px-4 ml-auto w-32" type="button" onClick={() => addMembersToChat(user)}>
								Add
							</button>
						</>)))}
			</div>
			<button className="secondary_button block px-4 ml-auto w-32" type="button" onClick={() => setUpdateGroupModal(prev => false)}>
				Cancel
			</button>
			<react_toastify_1.ToastContainer />
		</>);
};
exports.default = GroupAdminModal;
