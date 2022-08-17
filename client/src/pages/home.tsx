import { FC, lazy, Suspense, useState } from "react";
import { Header, Loading, ProfileModal } from "../components";
import { ChatState } from "../state";
const ChatPage = lazy(() => import("../components/homePage/chatPage"));
const ContactPage = lazy(() => import("../components/homePage/contactPage"));

const Home: FC = () => {
	const { user } = ChatState();
	const [showUserProfileModal, setShowUserProfileModal] = useState<boolean>(false);

	return (
		<main>
			<Header setShowUserProfileModal={setShowUserProfileModal} />
			{showUserProfileModal && (
				<ProfileModal setShowUserProfileModal={setShowUserProfileModal} />
			)}
			<section className="h-[calc(100vh-3.5625em)] flex">
				<Suspense
					fallback={
						<main className="h-full flex items-center justify-center">
							<Loading />
						</main>
					}
				>
					<ContactPage />
					<ChatPage />
				</Suspense>
			</section>
		</main>
	);
};

export default Home;
