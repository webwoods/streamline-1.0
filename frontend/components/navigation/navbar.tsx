'use client'
import React from "react";

import { Navbar, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import UserProfileButton from "./userProfileButton";
import ModalNotification from "./modalNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const tabs = ['Dashboard', 'Request', 'Files'];
  const menuItems = ['Dashboard', 'Request', 'Files', 'Profile', 'Log out'];

  return (
    <Navbar
      position="sticky"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#197dfd] dark:bg-gray-800 border-none pt-7 flex"
    >
      <NavbarContent className="sm:hidden inline-flex">
        <NavbarMenuToggle className="text-white" icon={<FontAwesomeIcon size="lg" icon={faBars} />} aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4">

        {tabs.map((tabData) => {
          return (
            <NavbarItem key={tabData}>
              <Button className="bg-white dark:bg-zinc-900 rounded-full py-2 hover:bg-black dark:hover:bg-[#197dfd] hover:text-white active:bg-blue-600 h-8 focus:ring focus:ring-gray-300 ">
                {tabData}
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
          <NavbarMenuItem key={`${item}-${index}`} >
            <Link
              className="w-full text-white"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
