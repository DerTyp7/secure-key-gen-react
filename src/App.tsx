import React from "react";
import Generator from "./Generator";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/assets/styles/app.scss";
import Legal from "./Legal";
import Privacy from "./Privacy";
import { getAnalytics } from "firebase/analytics";
import { app } from "./firebase";

function App() {
	const analytics = getAnalytics(app);

	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Generator />} />
						<Route path="legal" element={<Legal />} />
						<Route path="privacy" element={<Privacy />} />
						<Route path="*" element={<Generator />} />
					</Route>
				</Routes>
			</BrowserRouter>

			<Footer />
		</div>
	);
}

export default App;
