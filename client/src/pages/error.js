"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const error_png_1 = __importDefault(require("../assets/images/error.png"));
const Error = () => {
    return (<main className="min-h-screen text-white flex flex-col items-center justify-center gap-6 p-4">
			<img src={error_png_1.default} alt="error" width="450"/>
			<h2 className="text-center text-white">This page does not exist</h2>
			<react_router_dom_1.Link to="/" replace={true} className="mt-6 form_button w-fit px-8 py-4">
				Back to home
			</react_router_dom_1.Link>
		</main>);
};
exports.default = Error;
