"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does SkillBridge work?",
    answer:
      "SkillBridge connects students with verified expert tutors for personalized 1-on-1 lessons. Simply browse tutor profiles, read reviews, book a session at your preferred time, and connect via video call. It's that easy!",
  },
  {
    question: "How are tutors verified?",
    answer:
      "Every tutor on SkillBridge goes through a rigorous verification process. We check their credentials, teaching experience, and subject expertise. We also conduct a trial session review before they can start teaching on the platform.",
  },
  {
    question: "How much do lessons cost?",
    answer:
      "Lesson prices vary by tutor and subject, typically ranging from $15 to $80 per hour. Each tutor sets their own rates, so you can find options that fit your budget. We never charge hidden fees — the price you see is the price you pay.",
  },
  {
    question: "Can I reschedule or cancel a booking?",
    answer:
      "Yes! You can reschedule or cancel a booking up to 24 hours before the session starts at no charge. Cancellations within 24 hours may be subject to a small fee to respect your tutor's time.",
  },
  {
    question: "What subjects are available?",
    answer:
      "We offer 50+ subjects across categories including Programming, Languages, Music, Academics, Design, Business, Science, and more. Our catalog is constantly growing as we add new tutors and subjects.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Many tutors offer a free 15-minute introductory session so you can see if they're the right fit before committing. Look for the 'Free Trial' badge on tutor profiles. Signing up for SkillBridge is always free!",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50/80 dark:bg-gray-900/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 items-start">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Frequently Asked{" "}
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-muted-foreground md:text-lg leading-relaxed">
              Everything you need to know about SkillBridge. Can&apos;t find what
              you&apos;re looking for? Reach out to our support team.
            </p>
          </motion.div>

          {/* Right: Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-gray-100 dark:border-gray-800"
                  >
                    <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline hover:text-blue-600 dark:hover:text-blue-400 py-5 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-sm pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
