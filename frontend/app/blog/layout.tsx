export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex items-center justify-center ">
			<div className="  justify-center">
				{children}
			</div>
		</section>
	);
}
