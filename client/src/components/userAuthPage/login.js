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
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const bi_1 = require("react-icons/bi");
const userAuth_1 = require("../../pages/userAuth");
const utils_1 = require("../../utils");
const state_1 = require("../../state");
require("react-toastify/dist/ReactToastify.css");
const Login = ({ setAuthState }) => {
    const [values, setValues] = (0, react_1.useState)({ email: "", password: "" });
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { setUser } = (0, state_1.ChatState)();
    const handleLoginSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!values.email || !values.password) {
            react_toastify_1.toast.warn("Please validate all the fields", utils_1.toastOptions);
            return;
        }
        if (!(0, utils_1.validateMail)(values.email)) {
            react_toastify_1.toast.warn("Please enter a valid e-mail Id", utils_1.toastOptions);
            return;
        }
        try {
            const data = yield (0, utils_1.postRequest)("/user/login", {
                email: values.email,
                password: values.password,
            });
            if (data === null || data === void 0 ? void 0 : data.success) {
                setUser(data.user);
                navigate("/", { replace: true });
            }
            else {
                react_toastify_1.toast.error(data.message, utils_1.toastOptions);
            }
        }
        catch (err) {
            react_toastify_1.toast.error(err.message, utils_1.toastOptions);
        }
    });
    const handleInputChange = (e) => {
        setValues(prevVal => {
            return Object.assign(Object.assign({}, values), { [e.target.name]: e.target.value });
        });
    };
    return (<form onSubmit={handleLoginSubmit} className="p-6">
			<h1 className="text-center mb-6">Login</h1>
			<div className="input_container">
				<label htmlFor="email"></label>
				<input type="email" name="email" id="email" className="form_input" value={values.email} onChange={handleInputChange} placeholder="Enter your email"/>
			</div>
			<div className="input_container password_container">
				<label htmlFor="password"></label>
				<input type={showPassword ? "text" : "password"} name="password" id="password" className="form_input" value={values.password} onChange={handleInputChange} placeholder="Enter your password"/>
				{showPassword ? (<bi_1.BiHide onClick={() => setShowPassword(prevVal => !prevVal)} className="cursor-pointer" size={20}/>) : (<bi_1.BiShow onClick={() => setShowPassword(prevVal => !prevVal)} className="cursor-pointer" size={20}/>)}
			</div>
			<button type="submit" className="form_button">
				Login
			</button>
			<div className="flex flex-col justify-center">
				<react_router_dom_1.Link to="/forgot-password">
					<span className="transition-colors hover:text-tertiary">Forgot Password</span>
				</react_router_dom_1.Link>
				<p className="w-fit mx-auto text-center mt-4 cursor-pointer text-secondary transition-colors hover:text-tertiary" onClick={() => setAuthState(prevVal => userAuth_1.AuthState.SIGNUP)}>
					Don't have an account
				</p>
			</div>
			<react_toastify_1.ToastContainer />
		</form>);
};
exports.default = Login;
