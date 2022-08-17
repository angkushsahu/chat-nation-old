import { Schema, model } from "mongoose";

interface ChatType {
	chatName: string;
	isGroupChat: boolean;
	users: Schema.Types.ObjectId[];
	latestMessage: Schema.Types.ObjectId;
	groupAdmin: Schema.Types.ObjectId;
}

const chatSchema = new Schema(
	{
		chatName: { type: String, trim: true },
		isGroupChat: { type: Boolean, default: false },
		users: [{ type: Schema.Types.ObjectId, ref: "User" }],
		latestMessage: { type: Schema.Types.ObjectId, ref: "Message" },
		groupAdmin: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true },
);

export default model<ChatType>("Chat", chatSchema);
