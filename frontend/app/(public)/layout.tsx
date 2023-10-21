import "@/styles/globals.css";
import "@/styles/fonts.module.css";
import { MainNavbar } from "@/components/navigation/navbar";


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<MainNavbar />
			<main>
				{children}
			</main>
		</div>
	);
}
