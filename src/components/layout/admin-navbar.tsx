"use client";

import { useState, useEffect } from "react";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { authService } from "@/lib/services";
import { LogOut, LayoutDashboard, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type UserType = {
  id: string;
  email: string;
  name: string;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};

const getUserInitials = (name: string): string => {
  return name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
};

const getRoleBadgeColor = (role: string): string => {
  switch (role) {
    case "ADMIN":
      return "bg-gradient-to-r from-purple-500 to-pink-500";
    case "TUTOR":
      return "bg-gradient-to-r from-blue-500 to-cyan-500";
    case "STUDENT":
      return "bg-gradient-to-r from-green-500 to-emerald-500";
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-500";
  }
};

export function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser) as UserType);
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <div className="flex-1" /> {/* Spacer */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative h-10 w-10 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
                    >
                      <div className={`absolute inset-0 ${getRoleBadgeColor(user.role)} opacity-10 group-hover:opacity-20 transition-opacity`} />
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={`flex items-center justify-center h-full w-full text-white font-semibold text-sm ${getRoleBadgeColor(user.role)}`}>
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-2" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col">
                            <p className="text-sm font-semibold leading-none">{user.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${getRoleBadgeColor(user.role)}`}>
                            <Sparkles className="h-3 w-3" />
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() =>
                          (window.location.href = "/admin")
                        }
                        className="cursor-pointer py-2"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-red-600 focus:text-red-600 py-2"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </NavBody>
      <MobileNav visible={mobileMenuOpen}>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center space-x-2">
            <ThemeToggle />
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
          <div className="flex items-center space-x-2 mt-6 w-full">
            <div className="flex items-center gap-2 w-full">
              {user && (
                <div className="flex items-center flex-col gap-4 w-full">
                  {/* User info card for mobile */}
                  <div className="w-full p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-semibold ${getRoleBadgeColor(user.role)}`}>
                        {getUserInitials(user.name)}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white mt-1 w-fit ${getRoleBadgeColor(user.role)}`}>
                          <Sparkles className="h-3 w-3" />
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/admin"
                    className="w-full px-4 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-center font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center justify-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
