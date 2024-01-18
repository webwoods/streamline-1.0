import "@/styles/globals.css";
import "@/styles/fonts.module.css";
import { MainNavbar } from "@/components/navigation/navbar";
import Footer from "@/components/footer/footer";


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col">
			<MainNavbar />
			<main className="w-full h-max min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
				{children}
			</main>
			{/* <Footer /> */}
		</div>
	);
}
