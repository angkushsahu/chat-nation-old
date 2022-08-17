"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatState = void 0;
const react_1 = require("react");
const chatContext_1 = __importDefault(require("./chatContext"));
const ChatProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)({});
    const [selectedChat, setSelectedChat] = (0, react_1.useState)(null);
    const [chats, setChats] = (0, react_1.useState)([]);
    const [notification, setNotification] = (0, react_1.useState)([]);
    return (<chatContext_1.default.Provider value={{
            user,
            setUser,
            selectedChat,
            setSelectedChat,
            chats,
            setChats,
            notification,
            setNotification,
        }}>
			{children}
		</chatContext_1.default.Provider>);
};
const ChatState = () => {
    return (0, react_1.useContext)(chatContext_1.default);
};
exports.ChatState = ChatState;
exports.default = ChatProvider;
