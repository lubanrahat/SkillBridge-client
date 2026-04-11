"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Calendar, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/lib/services";
import { useSearchParams } from "next/navigation";

interface SidebarProps {
  role: "STUDENT" | "TUTOR" | "ADMIN" | "MODERATOR" | "ORGANIZATION";
}

const studentLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/bookings", label: "My Bookings", icon: Calendar },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

const tutorLinks = [
  { href: "/tutor/dashboard", label: "Dashboard", icon: Home },
  { href: "/tutor/profile", label: "Profile", icon: User },
  { href: "/tutor/availability", label: "Availability", icon: Calendar },
];

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/users", label: "Users", icon: User },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/categories", label: "Categories", icon: Home },
];

const moderatorLinks = [
  { href: "/moderator", label: "Dashboard", icon: Home },
];

const organizationLinks = [
  { href: "/organization", label: "Overview", icon: Home },
  { href: "/organization?tab=tutors", label: "Team Management", icon: User },
  { href: "/organization?tab=bookings", label: "Global Bookings", icon: Calendar },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const links =
    role === "STUDENT"
      ? studentLinks
      : role === "TUTOR"
        ? tutorLinks
        : role === "MODERATOR"
          ? moderatorLinks
          : role === "ORGANIZATION"
            ? organizationLinks
            : adminLinks;

  const handleLogout = () => {
    authService.logout();
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-white dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm hover:bg-gray-50 dark:hover:bg-neutral-800"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-neutral-900 border-r dark:border-neutral-800 transform transition-transform duration-300 ease-in-out flex flex-col h-full",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
            onClick={closeSidebar}
          >
            SkillBridge
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {role === "STUDENT"
              ? "Student"
              : role === "TUTOR"
                ? "Tutor"
                : role === "MODERATOR"
                  ? "Safety & Support"
                  : role === "ORGANIZATION"
                    ? "Institute"
                    : "Admin"}{" "}
            Dashboard
          </p>
        </div>

        <nav className="flex-1 px-4">
          {links.map((link) => {
            const Icon = link.icon;
            // Enhanced active status check for query params
            const isActive = link.href.includes("?") 
              ? `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}` === link.href
              : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 font-bold"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-400")} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t dark:border-neutral-800 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
