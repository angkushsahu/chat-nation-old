import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineSearch, AiFillBell } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ChatState } from "../../../state";
import LogoutModal from "../../modals/logoutModal";
import Notifications from "./notifications";
import Sidebar from "./sidebar";

interface HeaderProps {
	setShowUserProfileModal: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setShowUserProfileModal }: HeaderProps) => {
	const { user, notification } = ChatState();
	const [showSearch, setShowSearch] = useState<boolean>(false);
	const [showDropDown, setShowDropDown] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showNotification, setShowNotification] = useState<boolean>(false);

	const profileClickHandler = () => {
		setShowDropDown(prev => false);
		setShowUserProfileModal(prev => true);
	};

	const logoutClickHandler = () => {
		setShowDropDown(prev => false);
		setShowModal(prev => true);
	};

	return (
		<>
			{showModal ? (
				<LogoutModal setShowModal={setShowModal} />
			) : (
				<header className="bg-secondary px-4 sm:px-8 py-3 flex items-center justify-between">
					<div
						className="flex gap-2 items-center bg-primary rounded px-2 py-1 cursor-pointer"
						onClick={() => setShowSearch(prev => true)}
					>
						<AiOutlineSearch color="#4FD3C4" size={20} />
						<p className="text-secondary hidden sm:block font-js_regular">
							Search User
						</p>
					</div>
					<div className="flex gap-3 items-center">
						<div className="relative">
							{notification.length > 0 ? (
								<span className="absolute w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-xs">
									{notification.length}
								</span>
							) : (
								<></>
							)}
							<AiFillBell
								color="#1A1A40"
								size={30}
								className="cursor-pointer"
								onClick={() => setShowNotification(prev => !prev)}
							/>
						</div>
						{notification.length && showNotification ? <Notifications /> : <></>}
						<div
							className="flex items-center bg-primary rounded-md py-1 pl-2 cursor-pointer"
							onClick={() => setShowDropDown(prev => !prev)}
						>
							{user.pic ? (
								<img src={user.pic} alt={user.name} className="rounded-full h-8" />
							) : (
								<FaUserCircle color="#4FD3C4" size={25} />
							)}
							<RiArrowDropDownLine color="#4FD3C4" size={25} />
						</div>
						<ul
							className={`absolute z-10 bg-secondary text-black font-semibold top-16 right-4 sm:right-8 w-40 transition-transform origin-top shadow-lg shadow-gray-900 ${
								showDropDown ? "scale-y-100" : "scale-y-0"
							}`}
						>
							<li
								className="hover:bg-tertiary transition-colors duration-300 cursor-pointer py-2 px-4 font-p_semi"
								onClick={profileClickHandler}
							>
								My Profile
							</li>
							<li
								className="hover:bg-tertiary transition-colors duration-300 cursor-pointer py-2 px-4 font-p_semi"
								onClick={logoutClickHandler}
							>
								Logout
							</li>
						</ul>
					</div>
					{showSearch && <Sidebar setShowSearch={setShowSearch} />}
				</header>
			)}
		</>
	);
};

export default Header;
