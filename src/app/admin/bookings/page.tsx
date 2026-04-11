"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  adminService,
  type AdminBookingSummary,
} from "@/lib/services/admin.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBookingSummary[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | AdminBookingSummary["status"]
  >("ALL");
  const [tutorSearch, setTutorSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const response = await adminService.getBookings({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        page,
        limit: 9,
      });
      setBookings(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, page]);

  const filtered = bookings.filter((b) => {
    const tutorMatch = tutorSearch
      ? b.tutor.name.toLowerCase().includes(tutorSearch.toLowerCase())
      : true;
    const studentMatch = studentSearch
      ? b.student.name.toLowerCase().includes(studentSearch.toLowerCase())
      : true;
    return tutorMatch && studentMatch;
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and monitor all platform bookings
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Input
            placeholder="Filter by tutor name..."
            value={tutorSearch}
            onChange={(e) => setTutorSearch(e.target.value)}
            className="md:w-56"
          />
          <Input
            placeholder="Filter by student name..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="md:w-56"
          />
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val as "ALL" | AdminBookingSummary["status"]);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bookings Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-12">
              No bookings found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800 text-left text-gray-700 dark:text-gray-300">
                    <th className="px-4 py-3 font-medium">Student</th>
                    <th className="px-4 py-3 font-medium">Tutor</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="border-b dark:border-neutral-800 last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors text-gray-900 dark:text-gray-300">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium dark:text-gray-100">{b.student.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {b.student.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium dark:text-gray-100">{b.tutor.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {b.tutor.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span>
                            {new Date(b.startTime).toLocaleString()} –{" "}
                            {new Date(b.endTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Created {new Date(b.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">${b.totalPrice.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            b.status === "COMPLETED"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : b.status === "CONFIRMED"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : b.status === "CANCELLED"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t pt-8">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-24 border-gray-200 dark:border-neutral-800"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      size="sm"
                      className={`w-9 h-9 p-0 ${
                        p === page
                          ? "bg-gradient-to-r from-blue-600 to-violet-600 border-0"
                          : "border-gray-200 dark:border-neutral-800"
                      }`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-24 border-gray-200 dark:border-neutral-800"
                >
                  Next
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Page {page} of {totalPages}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
