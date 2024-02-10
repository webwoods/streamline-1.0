import QueryVendors from "@/components/query/queryVendors";
import Title from "@/components/title/title";

export default function VendorsPage() {
	return (
		<div className="p-10 w-screen h-screen">
			<Title title="Vendors" />
			<QueryVendors page={1} pageSize={10} />
		</div>
	);
}