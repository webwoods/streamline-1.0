'use client'
import { title } from "@/components/primitives";
import TableSort from "@/components/table/TableSort";

export default function BlogPage() {
	return (
		<div>
			<h1 className={title()}>Blog</h1>
			<TableSort/>
		</div>
	);
}
