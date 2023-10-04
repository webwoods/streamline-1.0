'use client'
import React from "react";

import {Navbar, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import UserProfileButton from "./userProfileButton";
import ModalNotification from "./modalNotification";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const tabs = ['Dashboard', 'Request', 'Files'];
  const menuItems = ['Dashboard', 'Request', 'Files'];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#197dfd] border-none pt-7"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      
        {tabs.map((tabData) => {
            return (
                <NavbarItem  key={tabData}>
                    <Button className="bg-white rounded-full py-2 hover:bg-black hover:text-white active:bg-blue-600  focus:ring focus:ring-gray-300 ">
                        {tabData}
                    </Button>
                </NavbarItem>
            )
          })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <UserProfileButton />
        </NavbarItem>
        <NavbarItem>
          <ModalNotification/>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="items-center pt-20">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} >
            <Link
              className="w-full p-5"
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
