"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, Video } from "lucide-react";

const steps = [
  {
    step: 1,
    icon: Search,
    title: "Search",
    subtitle: "Find your perfect match",
    desc: "Browse tutor profiles, read reviews, and filter by subject, price, or availability to find your ideal mentor.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    step: 2,
    icon: CalendarCheck,
    title: "Book",
    subtitle: "Schedule at your convenience",
    desc: "Pick a time that works for you and book a session in seconds. Get instant confirmation.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    step: 3,
    icon: Video,
    title: "Learn",
    subtitle: "Start your journey",
    desc: "Connect via video call and start learning with personalized guidance from your tutor.",
    gradient: "from-indigo-500 to-blue-500",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50/80 dark:bg-gray-900/30">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            How It{" "}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="mx-auto max-w-[500px] text-muted-foreground md:text-lg leading-relaxed">
            Get started in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-blue-300 via-violet-300 to-indigo-300 dark:from-blue-700 dark:via-violet-700 dark:to-indigo-700 origin-left"
            />
          </div>

          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex flex-col items-center text-center space-y-5"
            >
              {/* Step circle */}
              <div className="relative">
                <div
                  className={`w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${item.gradient} p-[3px] shadow-xl`}
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-950 flex items-center justify-center">
                    <item.icon className="w-10 h-10 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                {/* Step number badge */}
                <div
                  className={`absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                >
                  {item.step}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {item.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed max-w-[280px]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
