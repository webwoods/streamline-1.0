import QueryVendors from "@/components/query/queryVendors";

export default function VendorsPage() {
	return (
		<QueryVendors page={1} pageSize={10} />
	);
}