'use client'

import { faGears, faPlusSquare, faSquarePen, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function RequestsToolBar() {

	const router = useRouter();

	return (
		<div className="flex flex-col py-10 gap-3 text-xs">
			
			<div
				className="flex gap-2 text-blue-600 items-center"
				onClick={() => router.push('/requests/create')}
			>
				<div className="bg-white w-8 rounded-full aspect-square flex justify-center items-center">
					<FontAwesomeIcon size="lg" icon={faPlusSquare} />
				</div>
				<span>Create Request</span>
			</div>

			<div
				className="flex gap-2 text-slate-800 items-center"
				onClick={() => router.push('/requests/create')}
			>
				<div className="bg-white w-8 rounded-full aspect-square flex justify-center items-center">
					<FontAwesomeIcon size="lg" icon={faTableList} />
				</div>
				<span>View All Requests</span>
			</div>

			<div
				className="flex gap-2 text-slate-800 items-center"
				onClick={() => router.push('/requests/create')}
			>
				<div className="bg-white w-8 rounded-full aspect-square flex justify-center items-center">
					<FontAwesomeIcon size="lg" icon={faSquarePen} />
				</div>
				<span>Custom Form</span>
			</div>
		</div>
	);
}