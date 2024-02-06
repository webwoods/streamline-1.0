"use client";

import React, { Suspense, useCallback, useMemo, useState } from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
import { faCalendarWeek, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryRequests } from "../query/queryRequests";
import { QueryPurchaseOrders } from "../query/queryPurchaseOrders";

interface Props {
  getActiveTabActiveRecord?: (record: any) => typeof record;
}

export default function TableTabs({ getActiveTabActiveRecord }: Props) {
  const [activeTab, setActiveTab] = useState(" ");

  const handleTabChange = (tabKey: any) => {
    setActiveTab(tabKey);
  };

  // Memoize the tabs to prevent unnecessary re-renders
  const tabs = useMemo(() => ["Requests", "Purchase Orders", "Quotations"], []);

  const getActiveRecord = useCallback((record: any) => {
    getActiveTabActiveRecord && getActiveTabActiveRecord(record);
  }, []);

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
                  <Chip size="sm" variant="flat">
                    9
                  </Chip>
                </div>
              }
            />
          ))}
        </Tabs>

        <div className="flex gap-3 items-center text-slate-800 text-sm font-semibold">
          Date <FontAwesomeIcon size="lg" icon={faCalendarWeek} />
        </div>
      </div>

      <div className="flex flex-col content-center pt-10">
        <Suspense fallback={<div>Loading...</div>}>
          {activeTab === "Requests" && (
            <QueryRequests
              page={1}
              pageSize={2}
              renderTable={true}
              getActiveRecord={getActiveRecord}
            />
          )}
        </Suspense>
        {activeTab === "Purchase Orders" && (
          <QueryPurchaseOrders
            page={1}
            pageSize={2}
            renderTable={true}
            getActiveRecord={getActiveRecord}
            // Props for Purchase Orders component
          />
        )}
        {activeTab === "Quotations" && (
          <QueryPurchaseOrders
            page={1}
            pageSize={2}
            renderTable={true}
            getActiveRecord={getActiveRecord}
            // Props for Purchase Orders component
          />
        )}
      </div>
    </>
  );
}
