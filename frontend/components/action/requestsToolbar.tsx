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
					radius="full"
					className="flex justify-start bg-white"
					onClick={() => onClick && onClick('/')}
					startContent={<FontAwesomeIcon size="lg" icon={icon} />}
				>
					{title}
				</Button>
			</Tooltip>

			{/* mobile
			<Tooltip content={title}>
				<Button
					radius="full"
					className="bg-white lg:hidden block"
					isIconOnly
					onClick={() => onClick && onClick('/')}
					startContent={<FontAwesomeIcon size="lg" icon={icon} />}
				/>
			</Tooltip> */}
		</>
	);
}

export default function RequestsToolBar() {

	const router = useRouter();

	const testRouter = (href?: string) => {
		console.log(href);
	}

	return (
		<div className="flex lg:flex-col py-10 gap-3 text-xs">

			<Tool
				title="View All"
				icon={faTableList}
				onClick={() => testRouter('/requests')}
			/>

			<Tool
				title="Create"
				icon={faSquarePen}
				onClick={() => router.push('/requests/create')}
			/>

		</div>
	);
}