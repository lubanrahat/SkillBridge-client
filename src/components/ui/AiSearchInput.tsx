"use client";

import { useState } from "react";
import { Sparkles, Loader2, Search } from "lucide-react";
import { Button } from "./button";
import api from "@/lib/api";

type AIFilters = {
  subject?: string;
  maxPrice?: number;
  minPrice?: number;
  minRating?: number;
  categoryId?: string;
};

export function AiSearchInput({ onApplyFilters }: { onApplyFilters: (filters: AIFilters) => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await api.post<{ filters: AIFilters }>("/ai/search", { query });

      if (response.success && response.data?.filters) {
        onApplyFilters(response.data.filters);
      }
    } catch (e) {
      console.error("AI Search Error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group w-full max-w-2xl mx-auto mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl flex items-center p-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/50">
        <Sparkles className="h-5 w-5 text-indigo-500 ml-3 shrink-0" />
        <input
          className="flex-1 bg-transparent border-none focus:outline-none px-4 text-sm dark:text-white placeholder:text-gray-400"
          placeholder="Ask AI: 'Find me a React tutor under $30'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button 
          onClick={handleSearch} 
          disabled={loading || !query.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
          {loading ? "Searching..." : "AI Search"}
        </Button>
      </div>
    </div>
  );
}
