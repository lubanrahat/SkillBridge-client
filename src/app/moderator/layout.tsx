"use client";

import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/layout/navbar";

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth("MODERATOR");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden">
      <div className="flex-none border-b dark:border-neutral-800">
        <Header />
      </div>
      <div className="flex-1 flex overflow-hidden">
        <Sidebar role="MODERATOR" />
        <main className="flex-1 bg-gray-50 dark:bg-background p-4 md:p-8 overflow-y-auto lg:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}
