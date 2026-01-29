"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { TutorProfile, Category } from "@/types/api";
import { tutorService } from "@/lib/services/tutor.service";
import { categoryService } from "@/lib/services/category.service";
import { Header } from "@/components/layout/navbar";
import { TutorFilters } from "@/components/tutors/tutor-filters";
import { TutorCard } from "@/components/tutors/tutor-card";
import { Button } from "@/components/ui/button";

export default function TutorsPage() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "",
    minRate: 0,
    maxRate: 200,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const data = await tutorService.getAllTutors({
          search: filters.search || undefined,
          categoryId:
            filters.categoryId && filters.categoryId !== "all"
              ? filters.categoryId
              : undefined,
          minRate: filters.minRate || undefined,
          maxRate: filters.maxRate || undefined,
        });
        if (!cancelled) {
          setTutors(data);
          setTotalPages(Math.max(1, Math.ceil(data.length / 9)));
        }
      } catch (error) {
        console.error("Failed to fetch tutors:", error);
        if (!cancelled) {
          setTutors([]);
          setTotalPages(1);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [page, filters]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const pagedTutors = tutors.slice((page - 1) * 9, page * 9);

  const handleSearch = (query: string) => {
    setFilters({ ...filters, search: query });
    setPage(1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilters({ ...filters, categoryId });
    setPage(1);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setFilters({ ...filters, minRate: min, maxRate: max });
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-gray-50">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Find Your Perfect Tutor</h1>
            <p className="text-gray-600">
              Browse through {tutors.length} expert tutors and start learning
              today
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <TutorFilters
                onSearch={handleSearch}
                onCategoryChange={handleCategoryChange}
                onPriceRangeChange={handlePriceRangeChange}
                categories={categories}
              />
            </aside>

            {/* Tutors Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : tutors.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">
                    No tutors found matching your criteria.
                  </p>
                  <p className="text-gray-400 mt-2">
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {pagedTutors.map((tutor) => (
                      <TutorCard key={tutor.id} tutor={tutor} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center px-4">
                        Page {page} of {totalPages}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
