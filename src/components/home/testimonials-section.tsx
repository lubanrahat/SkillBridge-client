"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science Student",
    initials: "SC",
    avatarGradient: "from-blue-500 to-cyan-500",
    rating: 5,
    quote:
      "SkillBridge connected me with an amazing Python tutor. In just 3 months, I went from zero to building full-stack apps. The personalized attention is incredible!",
  },
  {
    name: "James Rodriguez",
    role: "Marketing Professional",
    initials: "JR",
    avatarGradient: "from-violet-500 to-purple-500",
    rating: 5,
    quote:
      "I needed to learn data analytics for my career switch. My tutor on SkillBridge was patient, knowledgeable, and helped me land my dream job within 6 months.",
  },
  {
    name: "Aisha Patel",
    role: "IELTS Test Taker",
    initials: "AP",
    avatarGradient: "from-emerald-500 to-green-500",
    rating: 5,
    quote:
      "Scored an 8.5 on IELTS thanks to my tutor! The flexible scheduling meant I could practice speaking sessions at times that worked for me. Highly recommend!",
  },
  {
    name: "Michael Kim",
    role: "Music Enthusiast",
    initials: "MK",
    avatarGradient: "from-pink-500 to-rose-500",
    rating: 4,
    quote:
      "Learning guitar online sounded impossible, but my tutor made it feel like in-person lessons. The video quality and booking system are top-notch.",
  },
  {
    name: "Emma Thompson",
    role: "High School Student",
    initials: "ET",
    avatarGradient: "from-amber-500 to-orange-500",
    rating: 5,
    quote:
      "My math grades went from C to A+ after just two months of tutoring. The tutors here genuinely care about your progress and make learning fun.",
  },
  {
    name: "David Liu",
    role: "Startup Founder",
    initials: "DL",
    avatarGradient: "from-indigo-500 to-blue-500",
    rating: 5,
    quote:
      "I used SkillBridge to upskill my entire team in React and TypeScript. The quality of tutors and the platform's ease of use exceeded our expectations.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50/80 dark:bg-gray-900/30">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800/50 text-xs font-semibold text-pink-700 dark:text-pink-300 uppercase tracking-wider">
            💬 Success Stories
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            What Our Students{" "}
            <span className="gradient-text">Say</span>
          </h2>
          <p className="max-w-[550px] text-muted-foreground md:text-lg leading-relaxed">
            Real stories from real students who transformed their learning with
            SkillBridge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="glass border-gray-100 dark:border-gray-800 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 md:p-8 space-y-5">
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-blue-200 dark:text-blue-800" />

                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s < item.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.avatarGradient} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
