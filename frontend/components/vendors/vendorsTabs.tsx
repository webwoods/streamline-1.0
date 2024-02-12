'use client'

import { Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface Props {
	onSelection?: (value: string) => void
}

export default function VendorsTabs({ onSelection }: Props) {
	const [selected, setSelected] = useState('all');

	useEffect(() => {
		onSelection && onSelection(selected);
	}, [selected]);

	useEffect(() => {
		setSelected("all");
	  }, []); 

	return (
		<div className='col-span-1 flex flex-col  gap-2'>
			<Tabs
				aria-label="Options"
				radius="none"
				selectedKey={selected}
				onSelectionChange={(key) => setSelected(key as string)}
				variant='light'
				classNames={{
					tabList: 'flex flex-col',
					tab: 'flex justify-start',
					cursor: 'rounded-sm'
				}}
			>
				<Tab key="all" title="All" />
				<Tab key="local" title="Local" />
				<Tab key="foreign" title="Foreign" />
			</Tabs>
		</div>
	);
}