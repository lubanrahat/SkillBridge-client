"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
// import { ModeToggle } from "@/components/ui/ModeToggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Find Tutors", link: "/tutors" }
  ];

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center space-x-2">
          <NavbarButton className="dark:bg-primary dark:text-white" href="/contact">Get Started</NavbarButton>
        </div>
      </NavBody>
      <MobileNav visible={mobileMenuOpen}>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center space-x-2">
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <NavItems items={navItems} className="flex flex-col space-x-0 space-y-4 relative w-full items-start" />
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}