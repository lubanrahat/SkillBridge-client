"use client";

import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/layout/navbar";
import { Suspense } from "react";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth("ORGANIZATION");

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
        <Suspense fallback={<div className="w-64 bg-white dark:bg-neutral-900 border-r dark:border-neutral-800" />}>
          <Sidebar role="ORGANIZATION" />
        </Suspense>
        <main className="flex-1 bg-gray-50 dark:bg-background overflow-y-auto">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
