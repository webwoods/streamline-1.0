import SVGImage from "@/components/common/image";
import QueryVendors from "@/components/query/queryVendors";
import Title from "@/components/title/title";
import VendorsTabs from "@/components/vendors/vendorsTabs";
import { Image, Tab, Tabs } from "@nextui-org/react";



export default function VendorsPage() {
	return (
		<div className="w-screen h-screen flex justify-center">
			<div className="max-w-screen-2xl w-full p-10 grid grid-cols-5 gap-5">
				<div className="col-span-1 flex flex-col gap-3">
					<div className="pb-5">
						<SVGImage
							src="undraw_delivery_truck_vt6p.svg"
							width={200}
							height={100}
						/>
					</div>
					<Title title="Vendors" />
					<VendorsTabs />
				</div>
				<div className="col-span-4">
					<QueryVendors page={1} pageSize={10} />
				</div>
			</div>
		</div>
	);
}