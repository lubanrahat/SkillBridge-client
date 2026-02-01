"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TutorCard } from "@/components/tutors/tutor-card";
import { tutorService } from "@/lib/services/tutor.service";
import type { TutorProfile } from "@/types/api";
import {
  Calendar,
  CheckCircle,
  Code2,
  Globe2,
  GraduationCap,
  Music,
  Users,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/layout/footer";
import { toast } from "sonner";

export default function Home() {
  const [featuredTutors, setFeaturedTutors] = useState<TutorProfile[]>([]);
  const [loadingTutors, setLoadingTutors] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutors/?limit=3`,
          {
            credentials: "include",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch tutors");
        }

        const tutors = await res.json();
        setFeaturedTutors(tutors.data);
      } catch (error) {
        console.error("Failed to fetch featured tutors", error);
      } finally {
        setLoadingTutors(false);
      }
    };

    fetchTutors();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-background to-background opacity-40 dark:from-indigo-900/40"></div>
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                Master Any Skill, <br /> Anytime, Anywhere.
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Connect with verified tutors for 1-on-1 lessons. Elevate your
                skills in coding, languages, music, and more with personalized
                guidance.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="rounded-full h-12 px-8 text-base bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 border-0 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 cursor-pointer"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/tutors">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-12 px-8 text-base border-gray-200 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:hover:bg-gray-900 dark:hover:text-gray-100 transition-all hover:scale-105 cursor-pointer "
                >
                  Find a Tutor
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="container px-4 md:px-6 mx-auto py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10k+", label: "Active Students" },
              { number: "500+", label: "Expert Tutors" },
              { number: "50+", label: "Subjects" },
              { number: "4.9/5", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutors Section */}
      <section className="py-24 bg-white dark:bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Meet Our Top Tutors
            </h2>
            <p className="max-w-[500px] text-gray-500 md:text-lg dark:text-gray-400">
              Learn from the very best.
            </p>
            <Link
              href="/tutors"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center group"
            >
              View All Tutors{" "}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {loadingTutors ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : featuredTutors.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No tutors available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose SkillBridge?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
              We provide the best environment for effective learning and rapid
              growth.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10 text-blue-600" />,
                title: "1-on-1 Mentorship",
                description:
                  "Get personalized attention from experts who tailor lessons to your specific goals and pace.",
              },
              {
                icon: <CheckCircle className="w-10 h-10 text-violet-600" />,
                title: "Vetted Tutors",
                description:
                  "Every tutor passes a rigorous verification process to ensure high-quality teaching standards.",
              },
              {
                icon: <Calendar className="w-10 h-10 text-indigo-600" />,
                title: "Flexible Scheduling",
                description:
                  "Book sessions that fit your busy life. Reschedule easily when things come up.",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="border-none shadow-lg shadow-gray-100/50 dark:shadow-none dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 transition-colors bg-white/50 dark:bg-gray-800/50"
              >
                <CardContent className="p-8 space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 bg-white dark:bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Explore Categories
            </h2>
            <p className="max-w-[500px] text-gray-500 md:text-lg dark:text-gray-400">
              Find the perfect area to upgrade your skills.
            </p>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center group"
            >
              View All Categories{" "}
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Code2,
                label: "Programming",
                color: "text-blue-500",
                bg: "bg-blue-100 dark:bg-blue-900/20",
              },
              {
                icon: Globe2,
                label: "Languages",
                color: "text-green-500",
                bg: "bg-green-100 dark:bg-green-900/20",
              },
              {
                icon: Music,
                label: "Music",
                color: "text-pink-500",
                bg: "bg-pink-100 dark:bg-pink-900/20",
              },
              {
                icon: GraduationCap,
                label: "Academics",
                color: "text-orange-500",
                bg: "bg-orange-100 dark:bg-orange-900/20",
              },
            ].map((cat, i) => (
              <Link href="/" key={i} className="group">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center space-y-4 h-full">
                  <div className={`p-4 rounded-full ${cat.bg}`}>
                    <cat.icon className={`w-8 h-8 ${cat.color}`} />
                  </div>
                  <span className="font-semibold text-lg">{cat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-200 via-blue-200 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 -z-10"></div>

            {[
              {
                step: 1,
                title: "Search",
                desc: "Browse profiles to find your perfect tutor.",
              },
              {
                step: 2,
                title: "Book",
                desc: "Schedule a lesson at a time that works for you.",
              },
              {
                step: 3,
                title: "Learn",
                desc: "Connect via video call and start learning.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-24 h-24 rounded-full bg-white dark:bg-black border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center text-2xl font-bold text-blue-600 shadow-sm">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-violet-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10 text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Start Your Journey?
          </h2>
          <p className="max-w-[600px] mx-auto text-blue-100 text-lg">
            Join thousands of students and tutors on SkillBridge today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="rounded-full bg-white text-blue-900 hover:bg-blue-50 w-full sm:w-auto font-semibold cursor-pointer"
              >
                Join as Student
              </Button>
            </Link>
            <Link href="/register?role=tutor">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-blue-200 text-blue-500 hover:bg-blue-800 hover:text-white border w-full sm:w-auto cursor-pointer"
              >
                Become a Tutor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
