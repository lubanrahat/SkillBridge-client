"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Star, Loader2 } from "lucide-react";
import type { Booking } from "@/types/api";
import { bookingService } from "@/lib/services/booking.service";
import { StatCard } from "@/components/dashboard/stat-card";
import { toast } from "sonner";

export default function TutorDashboardPage() {
  const { user } = useAuth("TUTOR");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const result = await bookingService.getMyBookings();
      setBookings(result.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const upcomingSessions = bookings.filter(
    (b) => b.status === "CONFIRMED",
  ).length;
  const totalEarnings = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 dark:text-gray-100">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here&apos;s your teaching overview</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Upcoming Sessions"
          value={upcomingSessions}
          icon={Calendar}
          description="Confirmed bookings"
        />
        <StatCard
          title="Total Earnings"
          value={`$${totalEarnings}`}
          icon={DollarSign}
          description="Completed sessions"
        />
        <StatCard
          title="Total Sessions"
          value={bookings.length}
          icon={Star}
          description="All time"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No sessions yet</p>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border dark:border-neutral-800 rounded-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 shrink-0" />
                    <div>
                      <h3 className="font-semibold dark:text-gray-100">
                        {booking.student?.name || "Anonymous Student"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(booking.startTime).toLocaleString()}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${booking.status === "CONFIRMED"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : booking.status === "COMPLETED"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  {booking.totalPrice && (
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      ${booking.totalPrice}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
