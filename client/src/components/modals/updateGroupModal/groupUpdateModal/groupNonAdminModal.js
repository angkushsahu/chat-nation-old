"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fa_1 = require("react-icons/fa");
const GroupNonAdminModal = ({ setUpdateGroupModal, selectedChat, setSelectedChat, }) => {
    return (<>
			<h1 className="text-center">{selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.chatName}</h1>
			{selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.users.map((user, idx) => (<div className="flex gap-2 items-center bg-primary hover:bg-userHoverBackground duration-300 transition-colors rounded-md p-4 cursor-pointer group" key={idx}>
					{user.pic ? (<img src={user.pic} alt={user.name} className="w-10"/>) : (<fa_1.FaUserCircle size={40} className="cursor-pointer text-secondary group-hover:text-primary"/>)}
					<div>
						<p className="font-js_semi text-secondary font-bold group-hover:text-black">
							{user.name}
						</p>
						<p className="description text-tertiary text-xs group-hover:text-primary">
							{user.email}
						</p>
					</div>
				</div>))}
			<button className="secondary_button block px-4 ml-auto w-32" type="button" onClick={() => setUpdateGroupModal(prev => false)}>
				Cancel
			</button>
		</>);
};
exports.default = GroupNonAdminModal;
