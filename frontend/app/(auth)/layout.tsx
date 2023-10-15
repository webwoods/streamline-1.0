import "@/styles/globals.css";
import "@/styles/fonts.module.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			{children}
		</main>
	);
}
