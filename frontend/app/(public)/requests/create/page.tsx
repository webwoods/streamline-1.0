import CreateRequest from "@/components/forms/requests/create";
import { ThreeColumnLayout } from "@/components/layouts/threeColumnLayout";
import { MultistepComponent } from "@/components/progress/stepProgress";

export default function CreateRequestPage() {
	
	
	return (
		<ThreeColumnLayout
			startContent={<></>}
			middleContent={<CreateRequest />}
			endContent={
				<div>
					{/* <MultistepComponent steps={[]} children={[]} /> */}
				</div>
			}
		/>
	);
}

