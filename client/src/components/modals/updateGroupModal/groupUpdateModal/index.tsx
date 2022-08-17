import { useState } from "react";
import Loading from "../../../loading";
import GroupAdminModal from "./groupAdminModal";
import GroupNonAdminModal from "./groupNonAdminModal";
import { UpdateModalProps } from "../index";
import { ChatState } from "../../../../state";
import "react-toastify/dist/ReactToastify.css";

const GroupUpdateModal = ({
	setUpdateGroupModal,
	selectedChat,
	setSelectedChat,
}: UpdateModalProps) => {
	const { user } = ChatState();
	const [updateLoading, setUpdateLoading] = useState<boolean>(false);

	return (
		<>
			{updateLoading ? (
				<main className="fixed inset-0 min-h-screen w-screen flex items-center justify-center">
					<Loading />
				</main>
			) : (
				<>
					{selectedChat?.groupAdmin._id === user._id ? (
						<GroupAdminModal
							setUpdateGroupModal={setUpdateGroupModal}
							selectedChat={selectedChat}
							setSelectedChat={setSelectedChat}
							updateLoading={updateLoading}
							setUpdateLoading={setUpdateLoading}
						/>
					) : (
						<GroupNonAdminModal
							setUpdateGroupModal={setUpdateGroupModal}
							selectedChat={selectedChat}
							setSelectedChat={setSelectedChat}
						/>
					)}
				</>
			)}
		</>
	);
};

export default GroupUpdateModal;
