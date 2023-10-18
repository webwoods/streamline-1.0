import SignupComponent from "@/components/auth/SignupComponent";
import LoginComponenet from "@/components/auth/loginComponenet";
import SummaryStatWidget from "@/components/donutchart/summaryStatWidget";
import StatusModal from "@/components/formStatusModal/statusModal";
import TableTabs from "@/components/tableTab/tab";

export default function Home() {
	return (
		<>
			<div>
				<SignupComponent />
				{/* <LoginComponenet/> */}
			</div>

		</>
	);
}