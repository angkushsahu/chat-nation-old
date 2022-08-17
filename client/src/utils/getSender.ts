import { UserType } from "../state";

export const getSenderName = (loggedUser: UserType, users: UserType[]) => {
	return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderEmail = (loggedUser: UserType, users: UserType[]) => {
	return users[0]._id === loggedUser._id ? users[1].email : users[0].email;
};

export const getSenderPicture = (loggedUser: UserType, users: UserType[]) => {
	return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
};
