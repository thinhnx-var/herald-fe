import "./App.css";
import logoUrl from "./assets/herald-bg.jpg";

function App() {
	return (
		<div>
			<img
				src={logoUrl}
				alt="logo"
				className="w-screen h-screen object-cover"
			/>
			<div className="absolute top-0 left-0 right-0 bottom-0 m-auto w-full bg-black/30 flex items-center justify-center">
				<h1 className="text-white text-4xl font-bold">Herald AI</h1>
			</div>
		</div>
	);
}

export default App;
