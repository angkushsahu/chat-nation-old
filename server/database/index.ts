import { connect } from "mongoose";

const db_url = process.env.DB_URI || "mongodb://localhost:27017/chat-nation";

connect(db_url)
	.then(() => console.log("Database connected"))
	.catch(error => console.log(error));
