const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="flex flex-col items-center justify-center h-screen w-screen">
			{children}
		</main>
	);
};

export default Layout;
