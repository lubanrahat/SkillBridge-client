"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TutorCard } from "@/components/tutors/tutor-card";
import { tutorService } from "@/lib/services/tutor.service";
import type { TutorProfile } from "@/types/api";
import { Loader2, Star } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function TopTutorsSection() {
  const [featuredTutors, setFeaturedTutors] = useState<TutorProfile[]>([]);
  const [loadingTutors, setLoadingTutors] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await tutorService.getAllTutors();
        const tutorsList = [...response.data]; // Create a copy to sort
        tutorsList.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        setFeaturedTutors(tutorsList.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch featured tutors", error);
        toast.error("Failed to load featured tutors");
      } finally {
        setLoadingTutors(false);
      }
    };

    fetchTutors();
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16 space-y-4"
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Top Rated
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Meet Our{" "}
            <span className="gradient-text">Top Tutors</span>
          </h2>
          <p className="max-w-[550px] text-muted-foreground md:text-lg leading-relaxed">
            Learn from the best — our highest-rated educators are ready to help
            you succeed.
          </p>
          <Link
            href="/tutors"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center group text-sm"
          >
            View All Tutors{" "}
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </motion.div>

        {loadingTutors ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : featuredTutors.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredTutors.map((tutor, i) => (
              <motion.div
                key={tutor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <TutorCard tutor={tutor} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            No tutors available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
