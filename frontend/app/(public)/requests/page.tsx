import ActionButton from "@/components/action/button";
import Details from "@/components/action/details";
import RequestsToolBar from "@/components/action/requestsToolbar";
import EmptyContent from "@/components/layouts/emptyContent";
import { SecondaryPanel } from "@/components/layouts/secondaryPanel";
import { ThreeColumnLayout } from "@/components/layouts/threeColumnLayout";
import TableTabs from "@/components/tableTab/tab";
import { faBoxesPacking, faClipboardCheck, faList, faPenNib, faPencil, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RequestsPage() {
	return (
		<ThreeColumnLayout
			startContent={<RequestsToolBar />}
			middleContent={<TableTabs />}
			endContent={
				<SecondaryPanel>
					<Details header="Details" cta="Edit" />
					<EmptyContent msg={"Click the 'eye' icon for a request from the table to view the data."} />
				</SecondaryPanel>
			}
		/>
	);
}