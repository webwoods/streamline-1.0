'use client'
import React from "react";

import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

export function TabSection() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" color="primary">
        <Tab key="dashboard" title="Dashboard">
          {/* <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>   */}
        </Tab>
        <Tab key="request" title="Request">
          {/* <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>   */}
        </Tab>
        <Tab key="files" title="Files">
          {/* <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>   */}
        </Tab>
      </Tabs>
    </div>  
  );
}
