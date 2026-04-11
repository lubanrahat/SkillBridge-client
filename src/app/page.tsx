"use client";

import { Header } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/layout/footer";

// Section components
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { TopTutorsSection } from "@/components/home/top-tutors-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { TrendingSkillsSection } from "@/components/home/trending-skills-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { SmartSearchSection } from "@/components/home/smart-search-section";
import { FAQSection } from "@/components/home/faq-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Stats */}
      <StatsSection />

      {/* 3. Top Tutors */}
      <TopTutorsSection />

      {/* 4. Why Choose SkillBridge */}
      <WhyChooseSection />

      {/* 5. Explore Categories */}
      <CategoriesSection />

      {/* 6. How It Works */}
      <HowItWorksSection />

      {/* 7. Trending Skills / Featured Courses */}
      <TrendingSkillsSection />

      {/* 8. Testimonials / Success Stories */}
      <TestimonialsSection />

      {/* 9. AI-Powered Smart Search */}
      <SmartSearchSection />

      {/* 10. FAQ */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-900 via-violet-900 to-purple-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-[20%] w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-[20%] w-96 h-96 bg-violet-500/15 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to Start Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-violet-200">
                Learning Journey
              </span>
              ?
            </h2>
            <p className="max-w-[600px] mx-auto text-blue-100/80 text-lg md:text-xl leading-relaxed">
              Join thousands of students and tutors on SkillBridge today. Your
              next breakthrough is just one session away.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="rounded-full h-14 px-10 text-base font-semibold bg-white text-blue-900 hover:bg-blue-50 shadow-xl shadow-black/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto cursor-pointer"
                >
                  Join as Student
                </Button>
              </Link>
              <Link href="/register?role=tutor">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-14 px-10 text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto cursor-pointer"
                >
                  Become a Tutor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
