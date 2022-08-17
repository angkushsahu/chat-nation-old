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
const Signup = ({ setAuthState }) => {
    const [values, setValues] = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [showConfirmPassword, setShowConfirmPassword] = (0, react_1.useState)(false);
    const [pic, setPic] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { setUser } = (0, state_1.ChatState)();
    const handleSignupSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!values.name || !values.email || !values.password || !values.confirmPassword) {
            react_toastify_1.toast.warn("Please validate all the fields", utils_1.toastOptions);
            return;
        }
        if (!(0, utils_1.validateMail)(values.email)) {
            react_toastify_1.toast.warn("Please enter a valid e-mail Id", utils_1.toastOptions);
            return;
        }
        if (values.confirmPassword !== values.password) {
            react_toastify_1.toast.warn("Password fields should match", utils_1.toastOptions);
            return;
        }
        try {
            const data = yield (0, utils_1.postRequest)("/user/signup", {
                name: values.name,
                email: values.email,
                password: values.password,
                pic,
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
    const postDetails = (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = () => {
            setPic(prev => String(reader.result));
        };
    };
    return (<form onSubmit={handleSignupSubmit} className="p-6">
			<h1 className="text-center mb-6">Signup</h1>
			<div className="input_container">
				<label htmlFor="name"></label>
				<input type="text" name="name" id="name" className="form_input" value={values.name} onChange={handleInputChange} placeholder="Enter your name"/>
			</div>
			<div className="input_container">
				<label htmlFor="email"></label>
				<input type="email" name="email" id="email" className="form_input" value={values.email} onChange={handleInputChange} placeholder="Enter your email"/>
			</div>
			<div className="input_container password_container">
				<label htmlFor="password"></label>
				<input type={showPassword ? "text" : "password"} name="password" id="password" className="form_input" value={values.password} onChange={handleInputChange} placeholder="Enter your password"/>
				{showPassword ? (<bi_1.BiHide onClick={() => setShowPassword(prevVal => !prevVal)} className="cursor-pointer" size={20}/>) : (<bi_1.BiShow onClick={() => setShowPassword(prevVal => !prevVal)} className="cursor-pointer" size={20}/>)}
			</div>
			<div className="input_container password_container">
				<label htmlFor="confirmPassword"></label>
				<input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" className="form_input" value={values.confirmPassword} onChange={handleInputChange} placeholder="Re-enter password"/>
				{showConfirmPassword ? (<bi_1.BiHide onClick={() => setShowConfirmPassword(prevVal => !prevVal)} className="cursor-pointer" size={20}/>) : (<bi_1.BiShow onClick={() => setShowConfirmPassword(prevVal => !prevVal)} className="cursor-pointer" size={20}/>)}
			</div>
			<div className="input_container">
				<label htmlFor="pic"></label>
				<input type="file" accept="image/*" name="pic" id="pic" className="form_input" onChange={postDetails} placeholder="Enter your pic"/>
			</div>
			<button type="submit" className="form_button">
				Signup
			</button>
			<div className="flex flex-col justify-center">
				<p className="w-fit mx-auto text-center mt-4 cursor-pointer transition-colors hover:text-tertiary" onClick={() => setAuthState(prevVal => userAuth_1.AuthState.LOGIN)}>
					Login instead
				</p>
			</div>
			<react_toastify_1.ToastContainer />
		</form>);
};
exports.default = Signup;
