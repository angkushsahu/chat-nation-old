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
const react_router_dom_1 = require("react-router-dom");
const state_1 = require("./state");
const components_1 = require("./components");
const HomePage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("./pages/home"))));
const UserAuthPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("./pages/userAuth"))));
const ForgotPassword = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("./pages/forgotPassword"))));
const ResetPassword = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("./pages/resetPassword"))));
const ErrorPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("./pages/error"))));
function App() {
    return (<main className="bg-primary text-white min-h-screen">
			<react_router_dom_1.BrowserRouter>
				<state_1.ChatProvider>
					<react_1.Suspense fallback={<main className="min-h-screen flex items-center justify-center">
								<components_1.Loading />
							</main>}>
						<react_router_dom_1.Routes>
							<react_router_dom_1.Route path="/" element={<components_1.ProtectedRoutes>
										<HomePage />
									</components_1.ProtectedRoutes>}/>
							<react_router_dom_1.Route path="/login" element={<components_1.ProtectedRoutes>
										<UserAuthPage />
									</components_1.ProtectedRoutes>}/>
							<react_router_dom_1.Route path="/forgot-password" element={<ForgotPassword />}/>
							<react_router_dom_1.Route path="/reset-password/:id" element={<ResetPassword />}/>
							<react_router_dom_1.Route path="/*" element={<ErrorPage />}/>
						</react_router_dom_1.Routes>
					</react_1.Suspense>
				</state_1.ChatProvider>
			</react_router_dom_1.BrowserRouter>
		</main>);
}
exports.default = App;
