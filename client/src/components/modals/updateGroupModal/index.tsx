import { Dispatch, SetStateAction } from "react";
import { SelectedChatType } from "../../../state";
import GroupUpdateModal from "./groupUpdateModal";
import SingleUserModal from "./singleUserModal";

export interface UpdateModalProps {
	setUpdateGroupModal: Dispatch<SetStateAction<boolean>>;
	selectedChat: SelectedChatType | null;
	setSelectedChat: Dispatch<SelectedChatType | null>;
}

const UpdateGroupModal = ({
	setUpdateGroupModal,
	selectedChat,
	setSelectedChat,
}: UpdateModalProps) => {
	return (
		<main className="px-4 min-h-screen fixed z-30 inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center">
			<section className="w-full max-w-[25em] sm:max-w-[31.25em] bg-primary px-6 sm:px-8 py-10 rounded-md">
				{selectedChat?.isGroupChat ? (
					<GroupUpdateModal
						setUpdateGroupModal={setUpdateGroupModal}
						selectedChat={selectedChat}
						setSelectedChat={setSelectedChat}
					/>
				) : (
					<SingleUserModal
						setUpdateGroupModal={setUpdateGroupModal}
						selectedChat={selectedChat}
						setSelectedChat={setSelectedChat}
					/>
				)}
			</section>
		</main>
	);
};

export default UpdateGroupModal;
