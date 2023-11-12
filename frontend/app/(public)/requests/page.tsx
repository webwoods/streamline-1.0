import TableTabs from "@/components/tableTab/tab";

export default function RequestsPage() {
	return (
		<div className="w-full h-full">
			<div className="bg-[#197dfd] w-full drop-shadow-md">
				<div className="px-[1.5rem] pb-5 sm:px-[1.5rem] lg:px-[29rem]">
					<h1 className="text-4xl text-white">Manage Requests</h1>
				</div>
			</div>

			<div>
				<div className="pt-10 px-[1.5rem] sm:px-[1.5rem] lg:px-[29rem]">
					<p>Effortlessly <span className="font-semibold">manage</span> your requests.</p>
					<p>Scan through the list, check statuses, and find what you need quickly with.</p>
				</div>
				<TableTabs />
			</div>
		</div >
	);
}