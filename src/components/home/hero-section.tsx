"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-36 md:pb-40">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-violet-50 to-background opacity-60 dark:from-blue-950/40 dark:via-violet-950/20 dark:to-background" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-40 right-[15%] w-96 h-96 bg-violet-400/15 dark:bg-violet-500/10 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute bottom-20 left-[40%] w-64 h-64 bg-indigo-400/15 dark:bg-indigo-500/8 rounded-full blur-3xl animate-float-fast" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-800/50 text-sm text-blue-700 dark:text-blue-300 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 10,000+ students worldwide</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
              <span className="text-foreground">Master Any Skill,</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-400 dark:via-violet-400 dark:to-purple-400 animate-gradient">
                Anytime, Anywhere.
              </span>
            </h1>
            <p className="mx-auto max-w-[680px] text-lg md:text-xl text-muted-foreground leading-relaxed">
              Connect with verified expert tutors for personalized 1-on-1
              lessons. Elevate your skills in coding, languages, music, and more
              with guidance tailored to you.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="rounded-full h-14 px-10 text-base font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 border-0 text-white shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 cursor-pointer group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/tutors">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-14 px-10 text-base font-semibold border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                Find a Tutor
              </Button>
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-4"
          >
            {[
              { value: "10k+", label: "Active Students" },
              { value: "500+", label: "Expert Tutors" },
              { value: "4.9★", label: "Average Rating" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="font-bold text-foreground">{item.value}</span>
                <span>{item.label}</span>
                {i < 2 && (
                  <span className="hidden md:inline ml-4 text-gray-300 dark:text-gray-700">
                    |
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
