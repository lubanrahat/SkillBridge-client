"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Calendar, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/lib/services";

interface SidebarProps {
  role: "STUDENT" | "TUTOR" | "ADMIN";
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

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const links =
    role === "STUDENT"
      ? studentLinks
      : role === "TUTOR"
        ? tutorLinks
        : adminLinks;

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="p-6">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
        >
          SkillBridge
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          {role === "STUDENT"
            ? "Student"
            : role === "TUTOR"
              ? "Tutor"
              : "Admin"}{" "}
          Dashboard
        </p>
      </div>

      <nav className="flex-1 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50",
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
