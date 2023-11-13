import ActionButton from "@/components/action/button";
import TableTabs from "@/components/tableTab/tab";

export default function RequestsPage() {
	return (
		<div className="w-full h-full">
			<div className="bg-accent-blue py-10 px-[1.5rem] sm:px-[1.5rem] lg:px-[29rem] grid grid-cols-2">
				<div className=" flex flex-col justify-center text-white">
					<h1 className="text-4xl font-medium text-white whitespace-pre-line">Manage{'\n'}Requests</h1>
					<h1 className="text-4xl pb-10 font-semibold text-white">. . .</h1>
					<p className="text-sm">Effortlessly <span className="font-medium">manage</span> your requests.</p>
					<p className="text-xs">Scan through the list, check statuses, and find what you need quickly with.</p>
				</div>
				<div className="grid grid-cols-2 gap-1 drop-shadow-md">
					<ActionButton props={{ title: 'Create New Request', icon: 'new' }} />
					<ActionButton props={{ title: 'Track Progress', icon: 'track' }} />
					<ActionButton props={{ title: 'View History', icon: 'history' }} />
					<ActionButton props={{ title: 'Generate Report', icon: 'report' }} />
				</div>
			</div>
			{/* <TableTabs /> */}
		</div >
	);
}