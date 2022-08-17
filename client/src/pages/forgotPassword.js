"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_toastify_1 = require("react-toastify");
const components_1 = require("../components");
const utils_1 = require("../utils");
require("react-toastify/dist/ReactToastify.css");
const ForgotPassword = () => {
    const [email, setEmail] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleForgotPassword = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!email) {
            react_toastify_1.toast.warn("Please validate all the fields", utils_1.toastOptions);
            return;
        }
        if (!(0, utils_1.validateMail)(email)) {
            react_toastify_1.toast.warn("Please enter a valid e-mail Id", utils_1.toastOptions);
            return;
        }
        try {
            setLoading(prev => true);
            const data = yield (0, utils_1.postRequest)("/user/forgot-password", { email });
            setLoading(prev => false);
            if (data === null || data === void 0 ? void 0 : data.success) {
                react_toastify_1.toast.success(data.message, utils_1.toastOptions);
                setEmail(prev => "");
            }
            else {
                react_toastify_1.toast.error(data.message, utils_1.toastOptions);
            }
        }
        catch (err) {
            react_toastify_1.toast.error(err.message, utils_1.toastOptions);
        }
        setLoading(prev => false);
    });
    return (<>
			{loading ? (<main className="min-h-screen flex items-center justify-center">
					<components_1.Loading />
				</main>) : (<main className="bg-tertiary min-h-screen flex flex-col items-center justify-center p-4">
					<section className="bg-primary rounded-md w-full max-w-md">
						<form onSubmit={handleForgotPassword} className="p-6">
							<h1 className="text-center mb-6">Forgot Password</h1>
							<div className="input_container">
								<label htmlFor="email"></label>
								<input type="email" name="email" id="email" className="form_input" value={email} onChange={(e) => setEmail(prev => e.target.value)} placeholder="Enter your email"/>
							</div>
							<button type="submit" className="form_button">
								Submit
							</button>
						</form>
					</section>
				</main>)}
			<react_toastify_1.ToastContainer />
		</>);
};
exports.default = ForgotPassword;
