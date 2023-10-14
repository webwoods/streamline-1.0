import SummaryStatWidget from "@/components/donutchart/summaryStatWidget";
import StatusModal from "@/components/formStatusModal/statusModal";
import TableSort from "@/components/table/TableSort";
import TableTabs from "@/components/tableTab/tab";

export default function Home() {
	return (
		<>
			<SummaryStatWidget />
			<div>
				<TableTabs/>
			</div>	
			<div className="flex content-center p-8 sm:px-28">
			<StatusModal/>
			</div>	
			
		</>
	);
}