
import RequestsToolBar from "@/components/action/requestsToolbar";
import SVGImage from "@/components/common/image";
import Requests from "@/components/forms/requests/requests";
import Title from "@/components/title/title";

export default function RequestsPage() {
	return (
		<div className="w-screen min-h-screen flex justify-center">
			<div className="max-w-screen-2xl w-full p-10 grid grid-cols-5 gap-5">
				<div className="col-span-1 flex flex-col gap-3">
					<div className="pb-5">
						<SVGImage
							src="undraw_contract_re_ves9.svg"
							width={150}
							height={100}
						/>
					</div>
					<Title title="Requests" />
					<RequestsToolBar />
				</div>
				<div className="col-span-4">
					<Requests />
				</div>
			</div>
		</div>
	);
}