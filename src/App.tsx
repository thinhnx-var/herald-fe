import { Route, Routes } from "react-router";
import "./App.css";
import HeraldPage from "./pages/herald";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HeraldPage />} />
			<Route path="*" element={<HeraldPage />} />
		</Routes>
	);
}

export default App;
