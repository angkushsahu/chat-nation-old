"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groupUpdateModal_1 = __importDefault(require("./groupUpdateModal"));
const singleUserModal_1 = __importDefault(require("./singleUserModal"));
const UpdateGroupModal = ({ setUpdateGroupModal, selectedChat, setSelectedChat, }) => {
    return (<main className="px-4 min-h-screen fixed z-30 inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center">
			<section className="w-full max-w-[25em] sm:max-w-[31.25em] bg-primary px-6 sm:px-8 py-10 rounded-md">
				{(selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.isGroupChat) ? (<groupUpdateModal_1.default setUpdateGroupModal={setUpdateGroupModal} selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>) : (<singleUserModal_1.default setUpdateGroupModal={setUpdateGroupModal} selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>)}
			</section>
		</main>);
};
exports.default = UpdateGroupModal;
