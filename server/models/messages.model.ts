import { Schema, model } from "mongoose";

interface MessageType {
	sender: Schema.Types.ObjectId;
	content: string;
	chat: Schema.Types.ObjectId;
}

const messageSchema = new Schema(
	{
		sender: { type: Schema.Types.ObjectId, ref: "User" },
		content: { type: String, trim: true },
		chat: { type: Schema.Types.ObjectId, ref: "Chat" },
	},
	{ timestamps: true },
);

export default model<MessageType>("Message", messageSchema);
