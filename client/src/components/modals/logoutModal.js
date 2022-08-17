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
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const utils_1 = require("../../utils");
require("react-toastify/dist/ReactToastify.css");
const LogoutModal = ({ setShowModal }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield (0, utils_1.getRequest)("/user/logout");
            if (data === null || data === void 0 ? void 0 : data.success) {
                navigate("/login", { replace: true });
            }
            else {
                react_toastify_1.toast.error(data.message, utils_1.toastOptions);
            }
        }
        catch (err) {
            react_toastify_1.toast.error(err.message, utils_1.toastOptions);
        }
    });
    return (<main className="px-4 min-h-screen fixed z-30 inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center">
			<section className="bg-primary px-6 sm:px-8 py-10 rounded-md">
				<p className="description text-secondary text-center">
					Are you sure you want to logout ?
				</p>
				<div className="flex items-center gap-4 mt-6">
					<button type="button" className="form_button" onClick={handleLogout}>
						Yes
					</button>
					<button type="button" className="secondary_button" onClick={() => setShowModal(prev => false)}>
						No
					</button>
				</div>
			</section>
			<react_toastify_1.ToastContainer />
		</main>);
};
exports.default = LogoutModal;
