"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Globe2,
  Music,
  GraduationCap,
  Palette,
  Briefcase,
  FlaskConical,
  Dumbbell,
} from "lucide-react";

const categories = [
  {
    icon: Code2,
    label: "Programming",
    count: "120+ Tutors",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    hoverBg: "group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40",
    border: "border-blue-100 dark:border-blue-900/30",
  },
  {
    icon: Globe2,
    label: "Languages",
    count: "95+ Tutors",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    hoverBg: "group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40",
    border: "border-emerald-100 dark:border-emerald-900/30",
  },
  {
    icon: Music,
    label: "Music",
    count: "60+ Tutors",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950/30",
    hoverBg: "group-hover:bg-pink-100 dark:group-hover:bg-pink-900/40",
    border: "border-pink-100 dark:border-pink-900/30",
  },
  {
    icon: GraduationCap,
    label: "Academics",
    count: "150+ Tutors",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    hoverBg: "group-hover:bg-orange-100 dark:group-hover:bg-orange-900/40",
    border: "border-orange-100 dark:border-orange-900/30",
  },
  {
    icon: Palette,
    label: "Design",
    count: "45+ Tutors",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    hoverBg: "group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40",
    border: "border-violet-100 dark:border-violet-900/30",
  },
  {
    icon: Briefcase,
    label: "Business",
    count: "70+ Tutors",
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    hoverBg: "group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/40",
    border: "border-cyan-100 dark:border-cyan-900/30",
  },
  {
    icon: FlaskConical,
    label: "Science",
    count: "80+ Tutors",
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-teal-950/30",
    hoverBg: "group-hover:bg-teal-100 dark:group-hover:bg-teal-900/40",
    border: "border-teal-100 dark:border-teal-900/30",
  },
  {
    icon: Dumbbell,
    label: "Fitness",
    count: "35+ Tutors",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-950/30",
    hoverBg: "group-hover:bg-red-100 dark:group-hover:bg-red-900/40",
    border: "border-red-100 dark:border-red-900/30",
  },
];

export function CategoriesSection() {
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
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Explore{" "}
            <span className="gradient-text">Categories</span>
          </h2>
          <p className="max-w-[550px] text-muted-foreground md:text-lg leading-relaxed">
            Find the perfect area to upgrade your skills — from tech to
            creative arts.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link href="/tutors" className="group block">
                <div
                  className={`${cat.bg} ${cat.hoverBg} border ${cat.border} p-6 md:p-8 rounded-2xl transition-all duration-300 flex flex-col items-center text-center space-y-3 h-full hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <cat.icon className={`w-7 h-7 ${cat.color}`} />
                  </div>
                  <span className="font-semibold text-base text-foreground">
                    {cat.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {cat.count}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
