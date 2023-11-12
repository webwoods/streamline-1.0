import "@/styles/globals.css";
import "@/styles/fonts.module.css";
import { MainNavbar } from "@/components/navigation/navbar";
import SummaryStatWidget from "@/components/donutchart/summaryStatWidget";


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-center justify-center">
			<MainNavbar />
			<div className="bg-[#197dfd] w-full">
				<SummaryStatWidget />
			</div>
			<main className="w-full">
				{children}
			</main>
		</div>
	);
}
