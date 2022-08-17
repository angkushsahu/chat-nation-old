// on server errors
process.on("uncaughtException", error => console.log("uncaughtException: ", error));
process.on("unhandledRejection", error => console.log("unhandledRejection: ", error));

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import "./database";
import app from "./app";

const port = process.env.PORT || 4000;

const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));

import { Server, Socket } from "socket.io";
const io = new Server(server, {
	pingTimeout: 60000,
	cors: {
		origin: process.env.BROWSER_URL,
	},
});

io.on("connection", (socket: Socket) => {
	socket.on("setup", userData => {
		socket.join(userData._id);
		socket.emit("connected");
	});

	socket.on("join chat", room => {
		socket.join(room);
	});

	socket.on("typing", room => {
		socket.to(room).emit("typing");
	});

	socket.on("stop typing", room => {
		socket.to(room).emit("stop typing");
	});

	socket.on("new message", newMessage => {
		const chat = newMessage.chat;
		if (!chat.users) {
			return;
		}
		chat.users.forEach((user: any) => {
			if (user._id === newMessage.sender._id) {
				return;
			}

			socket.in(user._id).emit("message received", newMessage);
		});
	});

	socket.off("setup", userData => {
		socket.leave(userData._id);
	});
});
