import RequestsToolBar from "@/components/action/requestsToolbar";
import SVGImage from "@/components/common/image";
import CreateRequest from "@/components/forms/requests/create";
import Title from "@/components/title/title";

export default function CreateRequestPage() {
	return (
		<div className="w-screen min-h-screen flex justify-center">
			<div className="max-w-screen-2xl w-full p-10 grid grid-cols-5 gap-5">
				<div className="col-span-1 flex flex-col gap-3">
					<div className="pb-5">
						<SVGImage
							src="../undraw_contract_re_ves9.svg"
							width={150}
							height={100}
						/>
					</div>
					<Title title="Requests" />
					<RequestsToolBar />
				</div>
				<div className="col-span-4">
					<div className="bg-white rounded-md">
						<CreateRequest />
					</div>
				</div>
			</div>
		</div>
	);
}

