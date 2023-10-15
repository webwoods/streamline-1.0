export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<div>
				{children}
			</div>
		</section>
	);
}
