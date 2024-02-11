'use client'

import { faGears, faPlusSquare, faSquarePen, faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ToolProps {
	title?: string
	icon?: any
	onClick?: (href?: string) => void
}

function Tool({ onClick, title, icon }: ToolProps) {
	return (
		<>
			{/* web */}
			<Tooltip content={title}>
				<Button
					radius="sm"
					size="md"
					className="flex justify-start bg-white shadow-sm hover:bg-slate-200"
					onClick={() => onClick && onClick('/')}
					startContent={<FontAwesomeIcon size="lg" icon={icon} />}
				>
					{title}
				</Button>
			</Tooltip>
		</>
	);
}

export default function RequestsToolBar() {

	const router = useRouter();

	return (
		<div className="flex md:flex-col py-10 gap-3 text-xs w-40 pr-5">

			<Tool
				title="View All"
				icon={faTableList}
				onClick={() => router.push('/requests')}
			/>

			<Tool
				title="Create"
				icon={faSquarePen}
				onClick={() => router.push('/requests/create')}
			/>

		</div>
	);
}