import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TutorProfile } from "@/types/api";

interface TutorCardProps {
    tutor: TutorProfile;
}

export function TutorCard({ tutor }: TutorCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-violet-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">
                            {tutor.user?.name || "Anonymous Tutor"}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{tutor.averageRating?.toFixed(1) || "0.0"}</span>
                            <span className="text-sm text-gray-500">
                                ({tutor.totalReviews || 0} reviews)
                            </span>
                        </div>
                    </div>
                </div>

                {tutor.bio && (
                    <p className="mt-4 text-sm text-gray-600 line-clamp-2">{tutor.bio}</p>
                )}

                <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {(tutor.subjects || []).slice(0, 3).map((subject) => (
                            <Badge key={subject} variant="secondary" className="rounded-full">
                                {subject}
                            </Badge>
                        ))}
                        {tutor.subjects && tutor.subjects.length > 3 && (
                            <Badge variant="outline" className="rounded-full">
                                +{tutor.subjects.length - 3} more
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-blue-600">
                            ${tutor.hourlyRate}
                            <span className="text-sm font-normal text-gray-500">/hr</span>
                        </div>
                        <Link href={`/tutors/${tutor.userId}`}>
                            <Button>View Profile</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
