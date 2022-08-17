"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const loading_1 = __importDefault(require("../../../loading"));
const groupAdminModal_1 = __importDefault(require("./groupAdminModal"));
const groupNonAdminModal_1 = __importDefault(require("./groupNonAdminModal"));
const state_1 = require("../../../../state");
require("react-toastify/dist/ReactToastify.css");
const GroupUpdateModal = ({ setUpdateGroupModal, selectedChat, setSelectedChat, }) => {
    const { user } = (0, state_1.ChatState)();
    const [updateLoading, setUpdateLoading] = (0, react_1.useState)(false);
    return (<>
			{updateLoading ? (<main className="fixed inset-0 min-h-screen w-screen flex items-center justify-center">
					<loading_1.default />
				</main>) : (<>
					{(selectedChat === null || selectedChat === void 0 ? void 0 : selectedChat.groupAdmin._id) === user._id ? (<groupAdminModal_1.default setUpdateGroupModal={setUpdateGroupModal} selectedChat={selectedChat} setSelectedChat={setSelectedChat} updateLoading={updateLoading} setUpdateLoading={setUpdateLoading}/>) : (<groupNonAdminModal_1.default setUpdateGroupModal={setUpdateGroupModal} selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>)}
				</>)}
		</>);
};
exports.default = GroupUpdateModal;
