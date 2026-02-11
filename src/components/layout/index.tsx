import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen bg-(--bg-primary)">
			<Header />
			<main className="flex-1">{children}</main>
		</div>
	);
}
