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
const fa_1 = require("react-icons/fa");
const ai_1 = require("react-icons/ai");
const state_1 = require("../../state");
const utils_1 = require("../../utils");
require("react-toastify/dist/ReactToastify.css");
const ProfileModal = ({ setShowUserProfileModal }) => {
    const { user, setUser } = (0, state_1.ChatState)();
    const [update, setUpdate] = (0, react_1.useState)(false);
    const [values, setValues] = (0, react_1.useState)({
        name: user.name,
        email: user.email,
    });
    const [pic, setPic] = (0, react_1.useState)("");
    const [deletePic, setDeletePic] = (0, react_1.useState)(false);
    const [changeInProfile, setChangeInProfile] = (0, react_1.useState)(false);
    const submitUpdatedUser = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (values.name === user.name &&
            values.email === user.email &&
            !changeInProfile &&
            !deletePic) {
            return;
        }
        if (!values.name || !values.email) {
            react_toastify_1.toast.warn("Please validate all the fields", utils_1.toastOptions);
            return;
        }
        if (!(0, utils_1.validateMail)(values.email)) {
            react_toastify_1.toast.warn("Please enter a valid e-mail Id", utils_1.toastOptions);
            return;
        }
        try {
            const data = yield (0, utils_1.putRequest)(`/user/update/${user._id}`, {
                name: values.name,
                email: values.email,
                pic,
                deletePicture: deletePic,
            });
            if (data === null || data === void 0 ? void 0 : data.success) {
                react_toastify_1.toast.success(data.message, utils_1.toastOptions);
                setUser(data.user);
                setUpdate(prev => false);
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
        setChangeInProfile(prev => true);
    };
    return (<main className="min-h-screen fixed z-30 inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center px-4">
			<section className="w-full max-w-[25em] sm:max-w-[31.25em] bg-primary px-6 sm:px-8 py-10 rounded-md">
				{update ? (<form onSubmit={submitUpdatedUser}>
						<h1 className="text-center mb-4">Update Profile</h1>
						<input type="name" id="name" name="name" className="form_input mb-4" value={values.name} onChange={handleInputChange} placeholder="Enter new name"/>
						<input type="email" id="email" name="email" className="form_input" value={values.email} onChange={handleInputChange} placeholder="Enter new email ID"/>
						<div className="input_container">
							<label htmlFor="pic">Edit Profile Picture</label>
							<input type="file" accept="image/*" name="pic" id="pic" className="form_input" onChange={postDetails} placeholder="Enter your pic"/>
						</div>
						<div className="my-6 flex items-center gap-2">
							<ai_1.AiTwotoneDelete size={30} className="text-secondary cursor-pointer" onClick={() => setDeletePic(prev => true)}/>
							<p>Delete profile picture</p>
						</div>
						<button type="submit" className="form_button mt-12">
							Set
						</button>
						<button type="button" className="secondary_button mt-2" onClick={() => setUpdate(prev => false)}>
							Cancel
						</button>
					</form>) : (<>
						<h1 className="text-center">{user.name}</h1>
						<p className="description text-tertiary text-center">{user.email}</p>
						{user.pic ? (<div className="flex items-center justify-center mt-8 mb-2">
								<img src={user.pic} alt={user.name} className="rounded-md w-40"/>
							</div>) : (<fa_1.FaUserCircle size={80} className="mx-auto mt-6"/>)}
						<div>
							<button type="button" className="form_button mt-8" onClick={() => setUpdate(prev => true)}>
								Update
							</button>
							<button type="button" className="secondary_button mt-1" onClick={() => setShowUserProfileModal(prev => false)}>
								Close
							</button>
						</div>
					</>)}
			</section>
			<react_toastify_1.ToastContainer />
		</main>);
};
exports.default = ProfileModal;
