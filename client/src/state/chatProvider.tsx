import { ReactNode, useContext, useState } from "react";
import ChatContext, { MessageTypes, SelectedChatType, UserType } from "./chatContext";

interface ChatProviderProps {
	children: ReactNode;
}

const ChatProvider = ({ children }: ChatProviderProps) => {
	const [user, setUser] = useState<UserType>({} as UserType);
	const [selectedChat, setSelectedChat] = useState<SelectedChatType | null>(null);
	const [chats, setChats] = useState<SelectedChatType[]>([] as SelectedChatType[]);
	const [notification, setNotification] = useState<MessageTypes[]>([]);

	return (
		<ChatContext.Provider
			value={{
				user,
				setUser,
				selectedChat,
				setSelectedChat,
				chats,
				setChats,
				notification,
				setNotification,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const ChatState = () => {
	return useContext(ChatContext);
};

export default ChatProvider;
