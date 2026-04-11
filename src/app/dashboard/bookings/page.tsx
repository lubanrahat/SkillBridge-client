"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Calendar, Clock, DollarSign, Star } from "lucide-react";
import { toast } from "sonner";
import type { Booking, CreateReviewRequest } from "@/types/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookingService } from "@/lib/services/booking.service";
import { reviewService } from "@/lib/services/review.service";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [reviewData, setReviewData] = useState<CreateReviewRequest>({
    tutorProfileId: "",
    rating: 5,
    comment: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [page, activeTab]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await bookingService.getMyBookings({
        page,
        limit: 9,
        status: activeTab === "all" ? undefined : activeTab,
      });
      setBookings(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await bookingService.cancelBooking(id);
      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to cancel booking";
      toast.error(message);
    }
  };

  const handleCompleteBooking = async (id: string) => {
    if (!confirm("Have you completed this session with the tutor?")) return;

    try {
      await bookingService.completeBooking(id);
      toast.success("Booking completed successfully");
      fetchBookings();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to complete booking";
      toast.error(message);
    }
  };

  const openReviewDialog = (booking: Booking) => {
    const tutorProfileId = booking.tutor.tutorProfile?.id;
    if (!tutorProfileId) {
      toast.error("This tutor does not have a profile to review yet.");
      return;
    }
    setReviewBooking(booking);
    setReviewData({
      tutorProfileId,
      rating: 5,
      comment: "",
    });
  };

  const submitReview = async () => {
    if (!reviewBooking) return;
    setSubmittingReview(true);
    try {
      await reviewService.createReview(reviewData);
      toast.success("Review submitted. Thank you!");
      setReviewBooking(null);
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error(
        "Unable to submit review. You can only review tutors after completing a session.",
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  const filterBookings = () => bookings;

  const renderBookingCard = (booking: Booking) => (
    <Card key={booking.id}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                {booking.tutor?.name || "Anonymous Tutor"}
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(booking.startTime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(booking.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(booking.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {booking.totalPrice && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>${booking.totalPrice}</span>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${booking.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "COMPLETED"
                      ? "bg-blue-100 text-blue-700"
                      : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            {(booking.status === "CONFIRMED" ||
              booking.status === "PENDING") && (
                <div className="flex flex-col gap-2">
                  {booking.status === "CONFIRMED" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 cursor-pointer"
                      onClick={() => handleCompleteBooking(booking.id)}
                    >
                      Mark Complete
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelBooking(booking.id)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            {booking.status === "COMPLETED" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => openReviewDialog(booking)}
              >
                <Star className="mr-1 h-4 w-4" />
                Leave Review
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-600">
          Manage your upcoming and past tutoring sessions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(val) => {
        setActiveTab(val);
        setPage(1);
      }}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <div className="space-y-4 mt-6">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {bookings.map(renderBookingCard)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t pt-8">
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
            </>
          )}
        </div>
      </Tabs>
      <Dialog
        open={!!reviewBooking}
        onOpenChange={(open) => !open && setReviewBooking(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              You&apos;re reviewing{" "}
              <span className="font-medium">
                {reviewBooking?.tutor.name || "this tutor"}
              </span>
              .
            </p>
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setReviewData((prev) => ({ ...prev, rating: star }))
                    }
                    className={`text-xl ${star <= reviewData.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                      }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comment (optional)</Label>
              <Textarea
                id="comment"
                rows={3}
                placeholder="Share your experience with this tutor..."
                value={reviewData.comment || ""}
                onChange={(e) =>
                  setReviewData((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReviewBooking(null)}
              disabled={submittingReview}
            >
              Cancel
            </Button>
            <Button
              onClick={submitReview}
              disabled={submittingReview}
              className="bg-gradient-to-r from-blue-600 to-violet-600 cursor-pointer"
            >
              {submittingReview ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
