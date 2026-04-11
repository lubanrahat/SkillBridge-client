"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Sparkles,
  Star,
  Clock,
  DollarSign,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const placeholders = [
  "Search for AI & Machine Learning tutors...",
  "Find IELTS preparation coaches...",
  "Discover React & TypeScript experts...",
  "Look for guitar lesson tutors...",
  "Find data science mentors...",
];

const filterChips = [
  { label: "Under $30/hr", icon: DollarSign, active: false },
  { label: "Rating 4+", icon: Star, active: true },
  { label: "Available Now", icon: Clock, active: false },
  { label: "Verified", icon: ShieldCheck, active: true },
];

export function SmartSearchSection() {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [activeFilters, setActiveFilters] = useState<Set<number>>(
    new Set([1, 3])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleFilter = (index: number) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-400/5 dark:bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center mb-12 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/50 text-xs font-semibold text-violet-700 dark:text-violet-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Smart Search for{" "}
              <span className="gradient-text">Perfect Tutors</span>
            </h2>
            <p className="max-w-[550px] text-muted-foreground md:text-lg leading-relaxed">
              Our intelligent search helps you find the right tutor based on
              your needs, budget, and availability.
            </p>
          </motion.div>

          {/* Search mock UI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Search bar */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-300" />
              <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 px-5 py-4 shadow-lg">
                <Search className="w-5 h-5 text-muted-foreground mr-4 flex-shrink-0" />
                <div className="flex-1 min-w-0 overflow-hidden h-7 relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentPlaceholder}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center text-muted-foreground text-base"
                    >
                      {placeholders[currentPlaceholder]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <Sparkles className="w-5 h-5 text-violet-500 ml-3 flex-shrink-0 animate-pulse-glow" />
              </div>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {filterChips.map((chip, i) => (
                <motion.button
                  key={i}
                  onClick={() => toggleFilter(i)}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <Badge
                    variant={activeFilters.has(i) ? "default" : "outline"}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                      activeFilters.has(i)
                        ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white border-0 shadow-md"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <chip.icon className="w-3.5 h-3.5 mr-1.5" />
                    {chip.label}
                  </Badge>
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-4">
              <Link href="/tutors">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  Try Smart Search
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
