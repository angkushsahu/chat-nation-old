"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const components_1 = require("../components");
const state_1 = require("../state");
const ChatPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("../components/homePage/chatPage"))));
const ContactPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("../components/homePage/contactPage"))));
const Home = () => {
    const { user } = (0, state_1.ChatState)();
    const [showUserProfileModal, setShowUserProfileModal] = (0, react_1.useState)(false);
    return (<main>
			<components_1.Header setShowUserProfileModal={setShowUserProfileModal}/>
			{showUserProfileModal && (<components_1.ProfileModal setShowUserProfileModal={setShowUserProfileModal}/>)}
			<section className="h-[calc(100vh-3.5625em)] flex">
				<react_1.Suspense fallback={<main className="h-full flex items-center justify-center">
							<components_1.Loading />
						</main>}>
					<ContactPage />
					<ChatPage />
				</react_1.Suspense>
			</section>
		</main>);
};
exports.default = Home;
