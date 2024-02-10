'use client'

import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";

export default function VendorsTabs() {
	const [selected, setSelected] = useState('all');

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