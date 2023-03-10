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
			<script
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8119996338498432"
				crossOrigin="anonymous"
			></script>
			<ins
				className="adsbygoogle"
				style={{ display: "block", marginTop: "50px" }}
				data-ad-client="ca-pub-8119996338498432"
				data-ad-slot="9391117708"
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
			<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
			<Footer />
		</div>
	);
}

export default App;
