"use client"
import React from "react";
import {Tabs, Tab} from "@nextui-org/react"; 

export default function TableTabs() {
  const variants = [
    "solid",
    "underlined",
    "bordered",
    "light",
  ];

  return (
    <div className="flex flex-wrap gap-4">
    
        <Tabs variant={"light"} aria-label="Tabs table" color="warning">
          <Tab key="requests" title="Requests"/>
          <Tab key="purchase" title="Purchase Order"/>
          <Tab key="quotations" title="Quotations"/>
        </Tabs>
   
    </div>
  );
}