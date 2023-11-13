import ActionButton from "@/components/action/button";
import TableTabs from "@/components/tableTab/tab";

export default function RequestsPage() {
	return (
		<div className="w-full h-full">
			{/* make this stick to where it is when scrolling */}
			<div className="bg-[#197dfd] w-full drop-shadow-md">
				<div className="px-[1.5rem] pb-5 sm:px-[1.5rem] lg:px-[29rem]">
					<h1 className="text-4xl text-white">Manage Requests</h1>
				</div>
			</div>

			<div>
				<div className="py-10 px-[1.5rem] sm:px-[1.5rem] lg:px-[29rem] grid grid-cols-3 bg-slate-800">
					<div className="col-span-2 flex flex-col justify-center gap-2 text-slate-50">
						<p>Effortlessly <span className="font-semibold">manage</span> your requests.</p>
						<p>Scan through the list, check statuses, and find what you need quickly with.</p>
					</div>
					<div className="grid grid-cols-2 gap-1">
						<ActionButton props={{ title: 'Create New Request', icon: 'new' }} />
						<ActionButton props={{ title: 'Create New Request' }} />
						<ActionButton props={{ title: 'Create New Request' }} />
						<ActionButton props={{ title: 'Create New Request' }} />
					</div>
				</div>
				<TableTabs />
			</div>
		</div >
	);
}