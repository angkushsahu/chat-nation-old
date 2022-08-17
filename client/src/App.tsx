import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatProvider } from "./state";
import { Loading, ProtectedRoutes } from "./components";
const HomePage = lazy(() => import("./pages/home"));
const UserAuthPage = lazy(() => import("./pages/userAuth"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword"));
const ResetPassword = lazy(() => import("./pages/resetPassword"));
const ErrorPage = lazy(() => import("./pages/error"));

function App() {
	return (
		<main className="bg-primary text-white min-h-screen">
			<BrowserRouter>
				<ChatProvider>
					<Suspense
						fallback={
							<main className="min-h-screen flex items-center justify-center">
								<Loading />
							</main>
						}
					>
						<Routes>
							<Route
								path="/"
								element={
									<ProtectedRoutes>
										<HomePage />
									</ProtectedRoutes>
								}
							/>
							<Route
								path="/login"
								element={
									<ProtectedRoutes>
										<UserAuthPage />
									</ProtectedRoutes>
								}
							/>
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="/reset-password/:id" element={<ResetPassword />} />
							<Route path="/*" element={<ErrorPage />} />
						</Routes>
					</Suspense>
				</ChatProvider>
			</BrowserRouter>
		</main>
	);
}

export default App;
