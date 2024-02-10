
import QueryStoreItems from "@/components/query/queryStoreItems";
import Title from "@/components/title/title";

export default function StorePage() {
	return (
		<div className="p-10 w-screen min-h-screen">
			<Title title="Store" />
			<QueryStoreItems page={1} pageSize={10} />
		</div>
	);
}