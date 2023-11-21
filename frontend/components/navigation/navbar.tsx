'use client'

import React, { useEffect } from "react";
import { Navbar, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Tooltip } from "@nextui-org/react";
import UserProfileButton from "./userProfileButton";
import ModalNotification from "./modalNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChartLine, faClipboard, faClipboardCheck, faDollarSign, faHome, faShop, faStore, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('Dashboard');

  const tabs = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    {
      label: "Insights",
      href: "/insights",
      icon: <FontAwesomeIcon icon={faChartLine} />,
    },
    {
      label: "Employees",
      href: "/employees",
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
    {
      label: "Vendors",
      href: "/vendors",
      icon: <FontAwesomeIcon icon={faStore} />,
    },
    {
      label: "Activity",
      href: "/activity",
      icon: <FontAwesomeIcon icon={faClipboard} />,
    },
    {
      label: "Requests",
      href: "/requests",
      icon: <FontAwesomeIcon icon={faClipboardCheck} />,
    },
    {
      label: "Bills",
      href: "/bills",
      icon: <FontAwesomeIcon icon={faDollarSign} />,
    },
  ];

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Insights",
      href: "/insights",
    },
    {
      label: "Employees",
      href: "/employees",
    },
    {
      label: "Vendors",
      href: "/vendors",
    },
    {
      label: "Activity",
      href: "/activity",
    },
    {
      label: "Requests",
      href: "/requests",
    },
    {
      label: "Bills",
      href: "/bills",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Log out",
      href: "/auth/login",
    },
  ];

  const router = useRouter();
  // [#197dfd]
  return (
    <Navbar
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#197dfd] dark:bg-gray-800 border-none p-0 flex"
      classNames={{
        base: 'p-0',
        wrapper: 'p-0 max-w-none p-5 sm:p-10'
      }}
    >
      <NavbarContent className="sm:hidden inline-flex">
        <NavbarMenuToggle className="text-white" icon={<FontAwesomeIcon size="lg" icon={faBars} />} aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-3">

        {tabs.map((tabData) => {
          const style = `${tabData.label === activeTab ? 'bg-slate-800 text-white hover:text-accent-yellow' : 'bg-gradient-to-r from-white to-cyan-50 hover:text-cprimary text-slate-800'} rounded-full active:bg-blue-600 h-8 drop-shadow-md`;

          return (
            tabData.label === activeTab ?
              <NavbarItem key={tabData.label}>
                <Button
                  className={style}
                  onClick={() => {
                    setActiveTab(tabData.label);
                    router.push(tabData.href)
                  }}
                  startContent={tabData.icon}
                >
                  {tabData.label}
                </Button>
              </NavbarItem> :
              <NavbarItem key={tabData.label}>
                <Button
                  className={`${style} min-w-0 max-w-[32px]`}
                  onClick={() => {
                    setActiveTab(tabData.label);
                    router.push(tabData.href)
                  }}
                  isIconOnly
                >
                  <Tooltip content={tabData.label}>
                    {tabData.icon}
                  </Tooltip>
                </Button>
              </NavbarItem>
          )
        })}
      </NavbarContent>

      <NavbarContent className="flex">
        <NavbarItem className="ml-auto">
          <UserProfileButton />
        </NavbarItem>
        <NavbarItem >
          <ModalNotification />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-[#197dfd] pt-10">
        {menuItems.map((item, index) => (
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
    </Navbar>
  );
}
