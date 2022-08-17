"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthState = void 0;
const react_1 = require("react");
const components_1 = require("../components");
var AuthState;
(function (AuthState) {
    AuthState[AuthState["LOGIN"] = 0] = "LOGIN";
    AuthState[AuthState["SIGNUP"] = 1] = "SIGNUP";
})(AuthState = exports.AuthState || (exports.AuthState = {}));
const UserAuth = () => {
    const [authState, setAuthState] = (0, react_1.useState)(AuthState.LOGIN);
    return (<main className="bg-tertiary min-h-screen flex flex-col items-center justify-center p-4">
			<section className="bg-primary rounded-md w-full max-w-md">
				<div className="flex items-center justify-center">
					<span onClick={() => setAuthState(prevVal => AuthState.LOGIN)} className={`flex-1 text-center py-2 cursor-pointer font-bold rounded-tl-md border-2 border-tertiary transition-colors ${authState === AuthState.LOGIN
            ? "bg-secondary text-primary"
            : "text-secondary"}`}>
						LOGIN
					</span>
					<span onClick={() => setAuthState(prevVal => AuthState.SIGNUP)} className={`flex-1 text-center py-2 cursor-pointer font-bold rounded-tr-md border-2 border-tertiary transition-colors ${authState === AuthState.SIGNUP
            ? "bg-secondary text-primary"
            : "text-secondary"}`}>
						SIGNUP
					</span>
				</div>
				{authState === AuthState.SIGNUP ? (<components_1.Signup setAuthState={setAuthState}/>) : (<components_1.Login setAuthState={setAuthState}/>)}
			</section>
		</main>);
};
exports.default = UserAuth;
