"use client";

import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Tabs, Tab, Chip, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { faCalendarWeek, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryRequests } from "../query/queryRequests";
import { QueryPurchaseOrders } from "../query/queryPurchaseOrders";
import PartialLoading from "../common/partialLoading";
import DatePicker from "../common/datePicker";
import { formButtonStyles } from "../forms/styles";

interface Props {
	getActiveTabActiveRecord?: (record: any) => typeof record;
}

export default function TableTabs({ getActiveTabActiveRecord }: Props) {
	const [activeTab, setActiveTab] = useState(" ");
	const [selectedDate, setSelectedDate] = useState<string | null>();
	const [selectedStatus, setSelectedStatus] = useState<string | null>();

	const handleTabChange = (tabKey: any) => {
		setActiveTab(tabKey);
	};

	const handleDateChange = useCallback((date: Date) => {
		const dateString = new Date(date).toLocaleDateString();
		setSelectedDate(dateString);
	}, []);

	// Memoize the tabs to prevent unnecessary re-renders
	const tabs = useMemo(() => ["Requests", "Purchase Orders", "Quotations"], []);

	const getActiveRecord = useCallback((record: any) => {
		getActiveTabActiveRecord && getActiveTabActiveRecord(record);
	}, []);

	useEffect(() => {
		setSelectedDate(null)
		setSelectedStatus(null)
	}, [])

	return (
		<>
			<div className="flex w-full justify-between items-center">
				<Tabs
					aria-label="Options"
					color="primary"
					variant="underlined"
					classNames={{
						tabList:
							"gap-6 w-full relative rounded-none p-0 border-b border-divider",
						cursor: "w-full bg-[#197dfd]",
						tab: "max-w-fit px-0 h-12",
						tabContent: "group-data-[selected=true]:text-[#197dfd]",
					}}
					selectedKey={activeTab}
					onSelectionChange={handleTabChange}
				>
					{tabs.map((tab) => (
						<Tab
							key={tab}
							title={
								<div className="flex items-center space-x-2">
									<FontAwesomeIcon icon={faFileLines} />
									<span>{tab}</span>
								</div>
							}
						/>
					))}
				</Tabs>

				<div className="flex gap-3 items-center text-slate-800 text-sm font-semibold">
					<DatePicker onDateChange={handleDateChange} />
					<Dropdown
						classNames={{
							base: 'rounded-md',
						}}

					>
						<DropdownTrigger>
							<Button
								className={formButtonStyles.primary}
							>
								Status
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Static Actions"
							itemClasses={{
								base: 'rounded-sm'
							}}
							onAction={(key) => setSelectedStatus(key as string)}
						>
							<DropdownItem className="hover:bg-gray-500" key="AWAITING_APPROVAL">
								<Chip
									color="default"
									size="md"
									variant="dot"
									classNames={{ base: "border-none" }}
								>
									Awaiting Approval
								</Chip>
							</DropdownItem>
							<DropdownItem className="hover:bg-gray-500" key="PROCESSING">
								<Chip
									color="primary"
									size="md"
									variant="dot"
									classNames={{ base: "border-none" }}
								>
									Processing
								</Chip>
							</DropdownItem>
							<DropdownItem className="hover:bg-gray-500" key="PENDING">
								<Chip
									color="warning"
									size="md"
									variant="dot"
									classNames={{ base: "border-none" }}
								>
									Pending
								</Chip>
							</DropdownItem>
							<DropdownItem className="hover:bg-gray-500" key="APPROVED">
								<Chip
									color="success"
									size="md"
									variant="dot"
									classNames={{ base: "border-none" }}
								>
									Approved
								</Chip>
							</DropdownItem>
							<DropdownItem className="hover:bg-gray-500" key="REJECTED">
								<Chip
									color="danger"
									size="md"
									variant="dot"
									classNames={{ base: "border-none" }}
								>
									Rejected
								</Chip>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>

			<div className="flex flex-col content-center pt-10">
				<Suspense fallback={<PartialLoading />}>
					{activeTab === "Requests" && (
						<QueryRequests
							page={1}
							pageSize={10}
							filter={{
								requestType: 'REQUEST',
								status: selectedStatus,
								updatedAt: selectedDate && new Date(selectedDate),
							}}
							renderTable={true}
							getActiveRecord={getActiveRecord}
						/>
					)}
				</Suspense>
				<Suspense fallback={<PartialLoading />}>
					{activeTab === "Purchase Orders" && (
						<QueryPurchaseOrders
							page={1}
							pageSize={10}
							filter={{
								requestType: 'PURCHASE_ORDER',
								status: selectedStatus,
								updatedAt: selectedDate && new Date(selectedDate),
							}}
							renderTable={true}
							getActiveRecord={getActiveRecord}
						// Props for Purchase Orders component
						/>
					)}
				</Suspense>
				<Suspense fallback={<PartialLoading />}>
					{activeTab === "Quotations" && (
						<QueryPurchaseOrders
							page={1}
							pageSize={10}
							filter={{
								requestType: 'QUOTATION',
								status: selectedStatus,
								updatedAt: selectedDate && new Date(selectedDate),
							}}
							renderTable={true}
							getActiveRecord={getActiveRecord}
						// Props for Purchase Orders component
						/>
					)}
				</Suspense>
			</div>
		</>
	);
}
