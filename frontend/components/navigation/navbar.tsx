'use client'

import React, { SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { Navbar, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Tooltip } from "@nextui-org/react";
import UserProfileButton from "./userProfileButton";
import ModalNotification from "./modalNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { tabs } from "./tabs";
import { menuItems } from "./menu";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const router = useRouter();

  const handleTabClick = useCallback((tabData: { label: SetStateAction<string>; href: string; }) => {
    setActiveTab(tabData.label);
    console.log(tabData.label, tabData.href);
    router.push(tabData.href);
  }, [activeTab, router]);

  // Memoize tabs and menuItems to prevent unnecessary re-renders
  const memoizedTabs = useMemo(() => tabs, []); // Empty dependency array means it only recomputes if tabs changes
  const memoizedMenuItems = useMemo(() => menuItems, []); // Same for menuItems

  const idleTabStyle = 'bg-gradient-to-r from-white to-cyan-50 hover:text-cprimary text-slate-800 min-w-0 max-w-[32px]';
  const activeTabStyle = 'bg-slate-800 text-white hover:text-accent-yellow';
  const tabStyle = 'rounded-full active:bg-blue-600 h-8 drop-shadow-md';

  // [#197dfd]
  return (
    <Navbar
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-gradient-to-r from-[#197dfd] via-[#197dfd] to-slate-900 dark:bg-gray-800 border-none p-0 flex"
      classNames={{
        base: 'p-0',
        wrapper: 'p-0 max-w-none p-5 sm:p-10 max-w-screen-2xl'
      }}
    >
      {/* mobile */}
      <NavbarContent className="sm:hidden inline-flex">
        <NavbarMenuToggle
          className="text-white"
          icon={<FontAwesomeIcon size="lg" icon={faBars} />}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarMenu className="bg-[#197dfd] pt-10">
        {memoizedMenuItems.map((item, index) => (
          <NavbarMenuItem key={item.label} >
            <Link
              className="w-full text-white"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      {/* web */}
      <NavbarContent className="hidden sm:flex gap-3">
        {memoizedTabs.map((tabData) => {
          const isIconOnly = activeTab !== tabData.label;

          return (
            <Tooltip
              key={tabData.label}
              content={tabData.label}
              placement="bottom"
            >
              <Button
                className={`${tabStyle} ${isIconOnly ? idleTabStyle : activeTabStyle}`}
                key={tabData.label}
                startContent={tabData.icon}
                isIconOnly={isIconOnly}
                onClick={() => handleTabClick(tabData)}>
                {!isIconOnly && <span className="mt-[0.15rem]">{tabData.label}</span>}
              </Button>
            </Tooltip>
          )
        })}
      </NavbarContent>
      <NavbarContent className="flex">
        <NavbarItem className="ml-auto">
          <UserProfileButton />
        </NavbarItem>
        <NavbarItem >
          {/* <ModalNotification /> */}
          <Button
            className="bg-transparent text-white"
            onClick={() => { router.push('/docs') }}
            radius="full"
          >Docs</Button>
        </NavbarItem>
      </NavbarContent>

    </Navbar>
  );
}
