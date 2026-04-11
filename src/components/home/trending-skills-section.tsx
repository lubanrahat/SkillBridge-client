"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Flame,
  Users,
  ArrowRight,
  Brain,
  Globe,
  Code,
  BarChart3,
  Smartphone,
  Layers,
} from "lucide-react";
import Link from "next/link";

const trendingCourses = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    category: "Technology",
    difficulty: "Intermediate",
    difficultyColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    students: "2.4k",
    tags: ["Python", "TensorFlow", "Neural Networks"],
    gradient: "from-violet-500/10 to-purple-500/10",
    borderGlow: "hover:border-violet-300 dark:hover:border-violet-700",
    iconColor: "text-violet-500",
    hot: true,
  },
  {
    title: "Full-Stack Web Dev",
    icon: Code,
    category: "Programming",
    difficulty: "Beginner",
    difficultyColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    students: "3.1k",
    tags: ["React", "Node.js", "TypeScript"],
    gradient: "from-blue-500/10 to-cyan-500/10",
    borderGlow: "hover:border-blue-300 dark:hover:border-blue-700",
    iconColor: "text-blue-500",
    hot: true,
  },
  {
    title: "IELTS Preparation",
    icon: Globe,
    category: "Languages",
    difficulty: "All Levels",
    difficultyColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    students: "1.8k",
    tags: ["Speaking", "Writing", "Listening"],
    gradient: "from-emerald-500/10 to-green-500/10",
    borderGlow: "hover:border-emerald-300 dark:hover:border-emerald-700",
    iconColor: "text-emerald-500",
    hot: false,
  },
  {
    title: "Data Science & Analytics",
    icon: BarChart3,
    category: "Technology",
    difficulty: "Advanced",
    difficultyColor: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    students: "1.5k",
    tags: ["SQL", "Python", "Visualization"],
    gradient: "from-orange-500/10 to-amber-500/10",
    borderGlow: "hover:border-orange-300 dark:hover:border-orange-700",
    iconColor: "text-orange-500",
    hot: false,
  },
  {
    title: "UI/UX Design",
    icon: Layers,
    category: "Design",
    difficulty: "Beginner",
    difficultyColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    students: "2.0k",
    tags: ["Figma", "Prototyping", "Research"],
    gradient: "from-pink-500/10 to-rose-500/10",
    borderGlow: "hover:border-pink-300 dark:hover:border-pink-700",
    iconColor: "text-pink-500",
    hot: false,
  },
  {
    title: "Mobile App Dev",
    icon: Smartphone,
    category: "Programming",
    difficulty: "Intermediate",
    difficultyColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    students: "1.2k",
    tags: ["React Native", "Flutter", "iOS"],
    gradient: "from-indigo-500/10 to-blue-500/10",
    borderGlow: "hover:border-indigo-300 dark:hover:border-indigo-700",
    iconColor: "text-indigo-500",
    hot: false,
  },
];

export function TrendingSkillsSection() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 text-xs font-semibold text-orange-700 dark:text-orange-300 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            Trending Now
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Featured Courses &{" "}
            <span className="gradient-text">Trending Skills</span>
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-lg leading-relaxed">
            Explore the most in-demand skills and find expert tutors to guide
            your learning journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingCourses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card
                className={`border border-gray-100 dark:border-gray-800 ${course.borderGlow} shadow-sm hover:shadow-xl transition-all duration-300 h-full group hover:-translate-y-1 overflow-hidden`}
              >
                {/* Gradient header strip */}
                <div
                  className={`h-1.5 bg-gradient-to-r ${course.gradient.replace("/10", "")}`}
                />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${course.gradient}`}
                      >
                        <course.icon
                          className={`w-6 h-6 ${course.iconColor}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {course.category}
                        </p>
                      </div>
                    </div>
                    {course.hot && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-[10px] px-2 py-0.5">
                        <Flame className="w-3 h-3 mr-0.5" />
                        HOT
                      </Badge>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {course.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full text-[11px] px-2.5 py-0.5 font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={`rounded-full text-[11px] px-2 py-0.5 border-0 ${course.difficultyColor}`}
                      >
                        {course.difficulty}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        {course.students}
                      </span>
                    </div>
                    <Link href="/tutors">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 h-auto font-medium group/btn cursor-pointer"
                      >
                        Explore
                        <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Button>
                    </Link>
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
