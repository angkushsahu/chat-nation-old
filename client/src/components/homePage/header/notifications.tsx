import { ChatState, MessageTypes } from "../../../state";
import { getSenderName } from "../../../utils";

const Notifications = () => {
	const { user, notification, setNotification, setSelectedChat } = ChatState();

	const handleNotificationList = (note: MessageTypes) => {
		setSelectedChat(note.chat);
		setNotification(notification.filter(n => n.sender !== note.sender));
	};

	return (
		<ul className="absolute bg-primary shadow-gray-600 shadow-md top-14 right-20 z-10">
			{notification.map((note, idx) => (
				<li
					className="pl-2 pr-8 py-2 border-[1px] border-gray-700 cursor-pointer"
					key={idx}
					onClick={() => handleNotificationList(note)}
				>
					{note.chat.isGroupChat
						? note.chat.chatName
						: getSenderName(user, note.chat.users)}
				</li>
			))}
		</ul>
	);
};

export default Notifications;
