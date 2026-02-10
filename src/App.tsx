import { Route, Routes } from "react-router";
import "./App.css";
import HeraldPage from "@/pages/herald";
import Layout from "@/components/layout";
import HomePage from "./pages/home";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout>
						<HomePage />
					</Layout>
				}
			/>
			<Route path="*" element={<HeraldPage />} />
		</Routes>
	);
}

export default App;
