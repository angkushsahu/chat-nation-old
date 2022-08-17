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
const utils_1 = require("../utils");
require("react-toastify/dist/ReactToastify.css");
const bi_1 = require("react-icons/bi");
const ResetPassword = () => {
    const [values, setValues] = (0, react_1.useState)({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [showConfirmPassword, setShowConfirmPassword] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { id } = (0, react_router_dom_1.useParams)();
    const handleResetPassword = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!values.password || !values.confirmPassword) {
            react_toastify_1.toast.warn("Please validate all the fields", utils_1.toastOptions);
            return;
        }
        if (values.confirmPassword !== values.password) {
            react_toastify_1.toast.warn("Password fields should match", utils_1.toastOptions);
            return;
        }
        try {
            const data = yield (0, utils_1.putRequest)("/user/reset-password", {
                id,
                password: values.password,
            });
            if (data === null || data === void 0 ? void 0 : data.success) {
                react_toastify_1.toast.success(data.message, utils_1.toastOptions);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
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
    return (<main className="bg-tertiary min-h-screen flex flex-col items-center justify-center p-4">
			<section className="bg-primary rounded-md w-full max-w-md">
				<form onSubmit={handleResetPassword} className="p-6">
					<h1 className="text-center mb-6">Reset Password</h1>
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
					<button type="submit" className="form_button">
						Submit
					</button>
				</form>
			</section>
			<react_toastify_1.ToastContainer />
		</main>);
};
exports.default = ResetPassword;
