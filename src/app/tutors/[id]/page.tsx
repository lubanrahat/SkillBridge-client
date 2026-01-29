import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Mail, DollarSign, BookOpen } from "lucide-react";
import type { Review, TutorProfile } from "@/types/api";
import { Header } from "@/components/layout/navbar";
import { BookingForm } from "@/components/tutors/booking-form";
import { env } from "@/lib/env";

async function getTutor(id: string) {
  try {
    const API_URL = env.BACKEND_URL || "http://localhost:8080/api/v1";
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

async function getTutorReviews(id: string) {
  try {
    const API_URL = env.BACKEND_URL || "http://localhost:8080/api/v1";
    const response = await fetch(`${API_URL}/reviews/tutor/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    console.log(data);
    return (data.data?.reviews || []) as Review[];
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

  const reviews = await getTutorReviews(tutor.userId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-12 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tutor Header */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex-shrink-0" />
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold mb-2">
                        {tutor.user?.name || "Anonymous Tutor"}
                      </h1>
                      <div className="flex items-center gap-4 mb-4">
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
                      <div className="flex flex-wrap gap-2">
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
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {tutor.bio || "This tutor hasn't added a bio yet."}
                  </p>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4">
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
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Reviews</h2>
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
    </div>
  );
}
