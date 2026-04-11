"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import api from "@/lib/api";

type RecommendedTutor = {
  tutorId: string;
  reason: string;
};

export function SmartRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendedTutor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await api.post<{ recommendations: RecommendedTutor[] }>("/ai/recommend", {
          budget: 50,
          goals: "Improve programming skills"
        });
        if (data.success && data.data?.recommendations) {
          setRecommendations(data.data.recommendations);
        }
      } catch (err) {
        console.error("AI Recommendation error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
        </CardContent>
      </Card>
    );
  }

  if (!recommendations.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          AI Recommendations for You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.slice(0, 3).map((rec, i) => (
            <div key={i} className="flex flex-col gap-2 p-4 border rounded-xl bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-200">{rec.reason}</p>
                <Link href={`/tutors/${rec.tutorId}`}>
                  <Button variant="outline" size="sm" className="ml-4 shrink-0">View Profile</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
