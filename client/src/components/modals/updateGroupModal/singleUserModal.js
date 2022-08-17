"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fa_1 = require("react-icons/fa");
const state_1 = require("../../../state");
const utils_1 = require("../../../utils");
const SingleUserModal = ({ setUpdateGroupModal, selectedChat }) => {
    const { user } = (0, state_1.ChatState)();
    const senderPicture = (0, utils_1.getSenderPicture)(user, selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users);
    const senderName = (0, utils_1.getSenderName)(user, selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users);
    const senderEmail = (0, utils_1.getSenderEmail)(user, selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users);
    return (<>
			<h1 className="text-center">{senderName}</h1>
			<p className="description text-tertiary text-center">{senderEmail}</p>
			{senderPicture ? (<div className="flex items-center justify-center mt-8 mb-2">
					<img src={senderPicture} alt={senderName} className="rounded-md w-40"/>
				</div>) : (<fa_1.FaUserCircle size={80} className="mx-auto mt-6"/>)}
			<button className="secondary_button block px-4 ml-auto w-32" type="button" onClick={() => setUpdateGroupModal(prev => false)}>
				Cancel
			</button>
		</>);
};
exports.default = SingleUserModal;
