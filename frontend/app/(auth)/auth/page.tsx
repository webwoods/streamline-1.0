import LoginComponenet from "@/components/auth/LoginComponenet";
import NewPassword from "@/components/auth/NewPassword";
import PasswordChange from "@/components/auth/PasswordChange";
import SignupComponent from "@/components/auth/SignupComponent";
import SummaryStatWidget from "@/components/donutchart/summaryStatWidget";
import StatusModal from "@/components/formStatusModal/statusModal";
import TableTabs from "@/components/tableTab/tab";

export default function Home() {
	return (
		<>
			<div>
				<LoginComponenet />
				<SignupComponent />
				<PasswordChange />
				<NewPassword />
			</div>

		</>
	);
}