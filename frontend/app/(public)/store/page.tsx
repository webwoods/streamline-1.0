
import SVGImage from "@/components/common/image";
import QueryStoreItems from "@/components/query/queryStoreItems";
import Title from "@/components/title/title";

export default function StorePage() {
	return (
		<div className="w-screen min-h-screen flex justify-center">
			<div className="max-w-screen-2xl w-full p-10 grid grid-cols-5 gap-5">
				<div className="col-span-1 flex flex-col gap-3">
					<div className="pb-5">
						<SVGImage
							src="undraw_logistics_x-4-dc.svg"
							width={200}
							height={100}
						/>
					</div>
					<Title title="Store" />
				</div>
				<div className="col-span-4">
					<QueryStoreItems page={1} pageSize={10} />
				</div>
			</div>
		</div>
	);
}