import ActionButton from "@/components/action/button";
import TableTabs from "@/components/tableTab/tab";
import { faBoxesPacking, faClipboardCheck, faList, faPenNib, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RoundIcon({ icon }: { icon: any }) {
	return (
		<div className={`flex justify-center items-center w-16 bg-slate-800 text-white aspect-square rounded-lg hover:text-accent-yellow`}>
			{icon}
		</div>
	);
}

export default function RequestsPage() {
	return (
		<div className="w-full h-full min-h-screen pb-20">
			<div className="bg-accent-blue py-10 px-[1.5rem] sm:px-[1.5rem] lg:px-[29rem] grid grid-cols-1 sm:grid-cols-2">
				<div className=" flex flex-col justify-center text-white">
					<h1 className="text-4xl font-medium text-white whitespace-pre-line">Manage{'\n'}Requests</h1>
					<h1 className="text-4xl pb-10 font-semibold text-white">. . .</h1>
					<p className="text-sm">Effortlessly <span className="font-medium">manage</span> requests.</p>
					<p className="text-xs">Scan through the list, check statuses, and find what you need quickly with.</p>
				</div>
				<div className="grid pt-5 sm:pt-0 grid-cols-2 gap-1 drop-shadow-md">
					<ActionButton props={{ title: 'Create New Request', icon: 'new' }} />
					<ActionButton props={{ title: 'Track Progress', icon: 'track' }} />
					<ActionButton props={{ title: 'View History', icon: 'history' }} />
					<ActionButton props={{ title: 'Generate Report', icon: 'report' }} />
				</div>
			</div>
			<div className="mt-10 text-slate-800 px-[1.5rem] sm:px-[1.5rem] lg:px-[29rem] grid grid-cols-1 sm:grid-cols-2">
				<div className="flex gap-2 justify-between sm:justify-start">
					<RoundIcon icon={<FontAwesomeIcon size="2x" icon={faBoxesPacking} />} />
					<RoundIcon icon={<FontAwesomeIcon size="2x" icon={faTruckFast} />} />
					<RoundIcon icon={<FontAwesomeIcon size="2x" icon={faList} />} />
					<RoundIcon icon={<FontAwesomeIcon size="2x" icon={faPenNib} />} />
					<RoundIcon icon={<FontAwesomeIcon size="2x" icon={faClipboardCheck} />} />
				</div>
				<div className="pt-10 sm:pt-0 text-left sm:text-right">
					<h1 className="text-4xl font-medium whitespace-pre-line">Requests{'\n'}Portal</h1>
					<h1 className="text-4xl font-semibold">. . .</h1>
				</div>
			</div>
			<TableTabs />
		</div >
	);
}