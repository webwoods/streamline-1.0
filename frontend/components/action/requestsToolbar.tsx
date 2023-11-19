'use client'

import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";

export default function RequestsToolBar() {
	return (
		<div className="flex flex-col items-center py-10 px-10">
			<Button
				startContent={<FontAwesomeIcon icon={faSquarePen} />}
				color="primary"
				className="rounded-[0.25rem] w-full"
			>Create
			</Button>
		</div>
	);
}