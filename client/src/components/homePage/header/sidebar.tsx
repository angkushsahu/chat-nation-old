import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { getRequest, postRequest, toastOptions } from "../../../utils";
import Loading from "../../loading";
import { ChatState } from "../../../state";
import "react-toastify/dist/ReactToastify.css";

interface SidebarProps {
	setShowSearch: Dispatch<SetStateAction<boolean>>;
}

interface SearchUserProps {
	_id: string;
	name: string;
	email: string;
	pic: string;
}

const Sidebar = ({ setShowSearch }: SidebarProps) => {
	const { setSelectedChat, chats, setChats } = ChatState();
	const [search, setSearch] = useState<string>("");
	const [users, setUsers] = useState<SearchUserProps[]>([]);
	const [accessChatLoading, setAccessChatLoading] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleSearchFilter = async (e: FormEvent) => {
		e.preventDefault();

		if (!search) {
			toast.warn("Please enter something to search", {
				...toastOptions,
				position: "top-left",
			});
			return;
		}

		try {
			setLoading(prev => true);
			const data = await getRequest(`/user/get-all-users?search=${search}`);

			setLoading(prev => false);
			if (data?.success) {
				setUsers(prev => data?.users);
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
		setLoading(prev => false);
	};

	const accessChat = async (id: string) => {
		try {
			setAccessChatLoading(prev => true);
			const data = await postRequest("/chat/access-chat", { userId: id });

			setAccessChatLoading(prev => false);
			if (data.success) {
				setShowSearch(prev => false);
				setChats([...chats, data.fullchat]);
				setSelectedChat(data.fullchat);
			} else {
				toast.error(data.message, toastOptions);
			}
		} catch (err: any) {
			toast.error(err.message!, toastOptions);
		}
	};

	return (
		<>
			{accessChatLoading ? (
				<main className="min-h-screen flex items-center justify-center">
					<Loading />
				</main>
			) : (
				<aside className="fixed z-20 inset-0 bg-white/10 backdrop-blur-md">
					<section className="bg-secondary h-full w-fit p-6">
						<ImCross
							color="#1A1A40"
							className="cursor-pointer"
							onClick={() => setShowSearch(prev => false)}
						/>
						<p className="description text-primary mt-4 font-bold">Search User</p>
						<form
							className="flex items-center gap-2 mt-4"
							onSubmit={handleSearchFilter}
						>
							<input
								type="text"
								className="flex-1 bg-primary text-secondary rounded px-2 py-1 border-none outline-none"
								value={search}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setSearch(prev => e.target.value)
								}
								autoComplete="off"
							/>
							<button
								className="bg-primary py-1 px-2 rounded cursor-pointer"
								type="submit"
							>
								<AiOutlineSearch color="#4FD3C4" size={23} />
							</button>
						</form>
						<section className="mt-6 pb-96 h-full flex flex-col gap-4 overflow-y-scroll no_scrollbars">
							{loading ? (
								<div className="flex items-center justify-center">
									<Loading />
								</div>
							) : (
								users.map(user => (
									<div
										className="flex gap-2 items-center bg-primary hover:bg-userHoverBackground duration-300 transition-colors rounded-md p-4 cursor-pointer group"
										key={user._id}
										onClick={() => accessChat(user._id)}
									>
										{user.pic ? (
											<img src={user.pic} alt={user.name} className="w-10" />
										) : (
											<FaUserCircle
												size={40}
												className="cursor-pointer text-secondary group-hover:text-primary"
											/>
										)}
										<div>
											<p className="font-js_semi text-secondary font-bold group-hover:text-black">
												{user.name}
											</p>
											<p className="description text-tertiary text-xs group-hover:text-primary">
												{user.email}
											</p>
										</div>
									</div>
								))
							)}
						</section>
					</section>
				</aside>
			)}
			<ToastContainer />
		</>
	);
};

export default Sidebar;
