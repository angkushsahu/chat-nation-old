"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../../../state");
const utils_1 = require("../../../utils");
const Notifications = () => {
    const { user, notification, setNotification, setSelectedChat } = (0, state_1.ChatState)();
    const handleNotificationList = (note) => {
        setSelectedChat(note.chat);
        setNotification(notification.filter(n => n.sender !== note.sender));
    };
    return (<ul className="absolute bg-primary shadow-gray-600 shadow-md top-14 right-20 z-10">
			{notification.map((note, idx) => (<li className="pl-2 pr-8 py-2 border-[1px] border-gray-700 cursor-pointer" key={idx} onClick={() => handleNotificationList(note)}>
					{note.chat.isGroupChat
                ? note.chat.chatName
                : (0, utils_1.getSenderName)(user, note.chat.users)}
				</li>))}
		</ul>);
};
exports.default = Notifications;
