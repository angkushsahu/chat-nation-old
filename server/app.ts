import express, { Request, Response, NextFunction } from "express";
const app = express();

app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(express.json({ limit: "200mb" }));

import cors from "cors";
app.use(cors({ credentials: true, origin: process.env.BROWSER_URL }));

import cookieParser from "cookie-parser";
app.use(cookieParser());

// import routes here
import { userRoutes, chatRoutes, messageRoutes } from "./routes";
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);

// --------------- DEPLOYMENT ---------------

import { join, resolve } from "path";
const clientDirectory = resolve();
if (process.env.NODE_ENV === "production") {
	app.use(express.static(join(clientDirectory, "/client/build", "index.html")));
	app.get("*", (req: Request, res: Response) => {
		res.status(200).sendFile(resolve(clientDirectory, "client", "build", "index.html"));
	});
} else {
	app.get("/", (req: Request, res: Response, next: NextFunction) => {
		res.status(200).send("Running API in development mode");
	});
}

// --------------- DEPLOYMENT ---------------

// // import error-middleware here
app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(404).json({ success: false, message: "Please enter a valid api url" });
});
import { error } from "./middlewares";
app.use(error);

export default app;
