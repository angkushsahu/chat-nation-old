"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ai_1 = require("react-icons/ai");
const fa_1 = require("react-icons/fa");
const ri_1 = require("react-icons/ri");
const state_1 = require("../../../state");
const logoutModal_1 = __importDefault(require("../../modals/logoutModal"));
const notifications_1 = __importDefault(require("./notifications"));
const sidebar_1 = __importDefault(require("./sidebar"));
const Header = ({ setShowUserProfileModal }) => {
    const { user, notification } = (0, state_1.ChatState)();
    const [showSearch, setShowSearch] = (0, react_1.useState)(false);
    const [showDropDown, setShowDropDown] = (0, react_1.useState)(false);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [showNotification, setShowNotification] = (0, react_1.useState)(false);
    const profileClickHandler = () => {
        setShowDropDown(prev => false);
        setShowUserProfileModal(prev => true);
    };
    const logoutClickHandler = () => {
        setShowDropDown(prev => false);
        setShowModal(prev => true);
    };
    return (<>
			{showModal ? (<logoutModal_1.default setShowModal={setShowModal}/>) : (<header className="bg-secondary px-4 sm:px-8 py-3 flex items-center justify-between">
					<div className="flex gap-2 items-center bg-primary rounded px-2 py-1 cursor-pointer" onClick={() => setShowSearch(prev => true)}>
						<ai_1.AiOutlineSearch color="#4FD3C4" size={20}/>
						<p className="text-secondary hidden sm:block font-js_regular">
							Search User
						</p>
					</div>
					<div className="flex gap-3 items-center">
						<div className="relative">
							{notification.length > 0 ? (<span className="absolute w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-xs">
									{notification.length}
								</span>) : (<></>)}
							<ai_1.AiFillBell color="#1A1A40" size={30} className="cursor-pointer" onClick={() => setShowNotification(prev => !prev)}/>
						</div>
						{notification.length && showNotification ? <notifications_1.default /> : <></>}
						<div className="flex items-center bg-primary rounded-md py-1 pl-2 cursor-pointer" onClick={() => setShowDropDown(prev => !prev)}>
							{user.pic ? (<img src={user.pic} alt={user.name} className="rounded-full h-8"/>) : (<fa_1.FaUserCircle color="#4FD3C4" size={25}/>)}
							<ri_1.RiArrowDropDownLine color="#4FD3C4" size={25}/>
						</div>
						<ul className={`absolute z-10 bg-secondary text-black font-semibold top-16 right-4 sm:right-8 w-40 transition-transform origin-top shadow-lg shadow-gray-900 ${showDropDown ? "scale-y-100" : "scale-y-0"}`}>
							<li className="hover:bg-tertiary transition-colors duration-300 cursor-pointer py-2 px-4 font-p_semi" onClick={profileClickHandler}>
								My Profile
							</li>
							<li className="hover:bg-tertiary transition-colors duration-300 cursor-pointer py-2 px-4 font-p_semi" onClick={logoutClickHandler}>
								Logout
							</li>
						</ul>
					</div>
					{showSearch && <sidebar_1.default setShowSearch={setShowSearch}/>}
				</header>)}
		</>);
};
exports.default = Header;
