"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Clock, CheckCircle, Loader2 } from "lucide-react";
import type { Booking } from "@/types/api";
import { bookingService } from "@/lib/services/booking.service";
import { toast } from "sonner";
import { SmartRecommendations } from "@/components/ui/SmartRecommendations";

export default function StudentDashboardPage() {
  const { user } = useAuth("STUDENT");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getMyBookings();

      setBookings(response.data);
      setStats({
        total: response.data.length,
        upcoming: response.data.filter(
          (b: Booking) => b.status === "CONFIRMED" || b.status === "PENDING",
        ).length,
        completed: response.data.filter((b: Booking) => b.status === "COMPLETED").length,
      });
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

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
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s an overview of your learning journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Bookings"
          value={stats.total}
          icon={Calendar}
          description="All time bookings"
        />
        <StatCard
          title="Upcoming Sessions"
          value={stats.upcoming}
          icon={Clock}
          description="Confirmed sessions"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          description="Finished sessions"
        />
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Link href="/dashboard/bookings">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                You haven&apos;t booked any sessions yet
              </p>
              <Link href="/tutors">
                <Button className="bg-gradient-to-r from-blue-600 to-violet-600">
                  Browse Tutors
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border dark:border-neutral-800 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 shrink-0" />
                    <div>
                      <h3 className="font-semibold dark:text-gray-100">
                        {booking.tutor?.name || "Anonymous Tutor"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(booking.startTime).toLocaleString()}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${booking.status === "CONFIRMED"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : booking.status === "COMPLETED"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : booking.status === "CANCELLED"
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <Link href={`/dashboard/bookings`}>
                    <Button className=" cursor-pointer" variant="ghost" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tutors">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 cursor-pointer">
                Find a Tutor
              </Button>
            </Link>
            <Link href="/dashboard/bookings">
              <Button variant="outline" className="w-full cursor-pointer">
                View My Bookings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* AI Recommendations */}
      <SmartRecommendations />
    </div>
  );
}
