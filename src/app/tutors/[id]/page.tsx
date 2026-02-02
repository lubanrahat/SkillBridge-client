import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Mail, DollarSign, BookOpen, Clock } from "lucide-react";
import type { Review, TutorProfile } from "@/types/api";
import { Header } from "@/components/layout/navbar";
import { BookingForm } from "@/components/tutors/booking-form";
import { env } from "@/lib/env";
import Footer from "@/components/layout/footer";

async function getTutor(id: string) {
  try {
    const API_URL = env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${API_URL}/tutors/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tutor:", error);
    return null;
  }
}

async function getTutorReviews(profileId: string, userId: string) {
  try {
    const API_URL = env.NEXT_PUBLIC_BACKEND_URL;

    const fetchReviews = async (id: string) => {
      const response = await fetch(`${API_URL}/reviews/tutor/${id}`, {
        cache: "no-store",
      });

      if (!response.ok) return null;

      const data = await response.json();
      console.log(`Reviews fetch for ${id}:`, data);

      const payload = data.data;
      if (Array.isArray(payload)) return payload as Review[];
      if (payload?.reviews && Array.isArray(payload.reviews))
        return payload.reviews as Review[];
      return [];
    };

    const reviewsByProfile = await fetchReviews(profileId);
    if (reviewsByProfile && reviewsByProfile.length > 0)
      return reviewsByProfile;
    const reviewsByUser = await fetchReviews(userId);
    return reviewsByUser || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export default async function TutorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutor = (await getTutor(id)) as TutorProfile | null;

  if (!tutor) {
    notFound();
  }

  const reviews = await getTutorReviews(tutor.id, tutor.userId);

  const getUserInitials = (name: string): string => {
    return name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || "")
      .join("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tutor Header */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold">
                      {getUserInitials(tutor.user?.name || "")}
                    </div>
                    <div className="flex-1 text-center md:text-left w-full">
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        {tutor.user?.name || "Anonymous Tutor"}
                      </h1>
                      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4 justify-center md:justify-start">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-semibold">
                            {tutor.averageRating?.toFixed(1) || "0.0"}
                          </span>
                          <span className="text-gray-500">
                            ({tutor.totalReviews || 0} reviews)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{tutor.user?.email}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {(tutor.subjects || []).map((subject: string) => (
                          <span
                            key={subject}
                            className="px-4 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {tutor.bio || "This tutor hasn't added a bio yet."}
                  </p>
                </CardContent>
              </Card>

              {/* Availability Section */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl md:text-2xl font-bold">Availability</h2>
                  </div>
                  {!tutor.availability ||
                    Object.keys(tutor.availability).length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No availability set yet
                    </p>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                        "saturday",
                        "sunday",
                      ].map((day) => {
                        const slots = tutor.availability?.[day] || [];
                        const hasSlots = slots.length > 0;

                        return (
                          <div
                            key={day}
                            className={`p-4 rounded-lg border-2 ${hasSlots
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-200 bg-gray-50"
                              }`}
                          >
                            <h3 className="font-semibold text-sm uppercase tracking-wide mb-2 text-gray-700">
                              {day.charAt(0).toUpperCase() + day.slice(1)}
                            </h3>
                            {hasSlots ? (
                              <div className="space-y-1">
                                {slots.map((slot, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <Clock className="h-3.5 w-3.5 text-blue-600" />
                                    <span className="text-gray-700 font-medium">
                                      {slot}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-400 text-sm italic">
                                Not available
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Hourly Rate</p>
                        <p className="text-2xl font-bold text-blue-600">
                          ${tutor.hourlyRate}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                        <Star className="h-6 w-6 text-violet-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="text-2xl font-bold text-violet-600">
                          {tutor.averageRating?.toFixed(1) || "0.0"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reviews</p>
                        <p className="text-2xl font-bold text-green-600">
                          {tutor.totalReviews || 0}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reviews Section */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-bold mb-6">Reviews</h2>
                  {reviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No reviews yet
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b pb-6 last:border-0"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <p className="font-semibold">
                                  {review.student?.name || "Anonymous"}
                                </p>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                        }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              {review.comment ? (
                                <p className="text-gray-600">
                                  {review.comment}
                                </p>
                              ) : null}
                              <p className="text-sm text-gray-400 mt-2">
                                {new Date(
                                  review.createdAt,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingForm
                  tutorId={tutor.userId}
                  tutorName={tutor.user?.name || "this tutor"}
                  hourlyRate={tutor.hourlyRate}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
