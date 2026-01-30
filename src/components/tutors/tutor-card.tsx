"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TutorProfile } from "@/types/api";
import { motion } from "framer-motion";

interface TutorCardProps {
  tutor: TutorProfile;
}

export function TutorCard({ tutor }: TutorCardProps) {
  const isTopRated = (tutor.averageRating || 0) >= 4.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="hover:shadow-2xl transition-all duration-300 border-gray-100 overflow-hidden group h-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-violet-400 to-purple-500 flex-shrink-0 p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-violet-400" />
                </div>
              </div>
              {isTopRated && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 shadow-md">
                  <Award className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate text-gray-900 group-hover:text-blue-600 transition-colors">
                {tutor.user?.name || "Anonymous Tutor"}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-900">
                  {tutor.averageRating?.toFixed(1) || "0.0"}
                </span>
                <span className="text-sm text-gray-500">
                  ({tutor.totalReviews || 0})
                </span>
              </div>
            </div>
          </div>

          {tutor.bio && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
              {tutor.bio}
            </p>
          )}

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(tutor.subjects || []).slice(0, 3).map((subject) => (
                <Badge
                  key={subject}
                  variant="secondary"
                  className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 border-0"
                >
                  {subject}
                </Badge>
              ))}
              {tutor.subjects && tutor.subjects.length > 3 && (
                <Badge
                  variant="outline"
                  className="rounded-full border-blue-200 text-blue-600"
                >
                  +{tutor.subjects.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  ${tutor.hourlyRate}
                </div>
                <span className="text-xs text-gray-500">per hour</span>
              </div>
              <Link href={`/tutors/${tutor.id}`}>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
