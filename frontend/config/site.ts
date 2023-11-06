export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Stream Line",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Requests",
			href: "/requests",
		},
		{
			label: "Files",
			href: "/files",
		},
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Log out",
			href: "/auth/login",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
