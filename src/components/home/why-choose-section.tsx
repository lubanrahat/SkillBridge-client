"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  CheckCircle,
  Calendar,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description:
      "Get personalized attention from experts who tailor lessons to your specific goals and learning pace.",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: CheckCircle,
    title: "Vetted Tutors",
    description:
      "Every tutor passes a rigorous verification process to ensure high-quality teaching standards.",
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Book sessions that fit your busy life. Reschedule easily when things come up.",
    gradient: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Zap,
    title: "Smart Matching",
    description:
      "AI-powered recommendations connect you with the perfect tutor based on your goals and preferences.",
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description:
      "Pay safely through our platform with money-back guarantee if you're not satisfied.",
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and milestone achievements.",
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10",
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50/50 dark:bg-gray-900/20">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Why Choose{" "}
            <span className="gradient-text">SkillBridge</span>?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg leading-relaxed">
            We provide the best environment for effective learning and rapid
            growth, powered by technology and expert educators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="border-transparent shadow-sm hover:shadow-xl dark:bg-gray-900/50 dark:hover:bg-gray-900/80 transition-all duration-300 h-full group hover:-translate-y-1 hover:border-blue-100 dark:hover:border-blue-900/50">
                <CardContent className="p-8 space-y-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
