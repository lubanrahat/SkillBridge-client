"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, GraduationCap, BookOpen, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    target: 10000,
    suffix: "+",
    label: "Active Students",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: GraduationCap,
    target: 500,
    suffix: "+",
    label: "Expert Tutors",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: BookOpen,
    target: 50,
    suffix: "+",
    label: "Subjects",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Star,
    target: 4.9,
    suffix: "/5",
    label: "Average Rating",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    isDecimal: true,
  },
];

function AnimatedCounter({
  target,
  suffix,
  isDecimal,
  inView,
}: {
  target: number;
  suffix: string;
  isDecimal?: boolean;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(target, current + increment);
      setCount(current);

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  const display = isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString();

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative border-y border-gray-100 dark:border-gray-800/50 bg-gray-50/80 dark:bg-gray-900/30">
      <div ref={ref} className="container px-4 md:px-6 mx-auto py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 md:p-8 text-center space-y-3 hover:scale-[1.02] transition-transform duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mx-auto`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                  inView={isInView}
                />
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
