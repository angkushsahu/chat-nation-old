import { createContext, Dispatch } from "react";

export interface UserType {
	_id: string;
	name: string;
	email: string;
	pic: string;
}

export interface SelectedChatType {
	_id: string;
	chatName: string;
	isGroupChat: boolean;
	groupAdmin: UserType;
	users: UserType[];
}

export interface MessageTypes {
	_id: string;
	chat: SelectedChatType;
	sender: {
		_id: string;
		name: string;
		pic: string;
	};
	content: string;
}

interface ChatContextType {
	user: UserType;
	setUser: Dispatch<UserType>;
	selectedChat: SelectedChatType | null;
	setSelectedChat: Dispatch<SelectedChatType | null>;
	chats: SelectedChatType[];
	setChats: Dispatch<SelectedChatType[]>;
	notification: MessageTypes[];
	setNotification: Dispatch<MessageTypes[]>;
}

const ChatContext = createContext({} as ChatContextType);

export default ChatContext;
