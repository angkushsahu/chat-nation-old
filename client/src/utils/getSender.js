"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSenderPicture = exports.getSenderEmail = exports.getSenderName = void 0;
const getSenderName = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};
exports.getSenderName = getSenderName;
const getSenderEmail = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].email : users[0].email;
};
exports.getSenderEmail = getSenderEmail;
const getSenderPicture = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
};
exports.getSenderPicture = getSenderPicture;
