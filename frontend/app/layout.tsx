import "@/styles/globals.css";
import "@/styles/fonts.module.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				// className="bg-zinc-900"
				style={{
					fontFamily: 'Readex Pro'
				}}>
				<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
					<div className="relative flex flex-col h-screen">
						<main>
							{children}
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
