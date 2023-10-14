'use client'
import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import TableSort from "../table/TableSort";

export default function TableTabs() {
  const [activeTab, setActiveTab] = useState(" ");

  const handleTabChange = (tabKey: any) => {
    setActiveTab(tabKey);
  };

  return (
    <div >
      <div className="flex content-center pt-5 pb-2 sm:px-28">
      <Tabs variant="light" aria-label="Tabs table" color="warning" selectedKey={activeTab} onSelectionChange={handleTabChange}>
        <Tab key="requests" title="Requests" value="requests" />
        <Tab key="purchase" title="Purchase Order" value="purchase" />
        <Tab key="quotations" title="Quotations" value="quotations" />
      </Tabs>
      </div>


      <div className="flex content-center sm:px-28">
        {activeTab === "requests" && <TableSort type="requests" />}
        {activeTab === "purchase" && <TableSort type="purchase" />}
        {activeTab === "quotations" && <TableSort type="quotations" />}
			</div>

    
    </div>
  );
}
