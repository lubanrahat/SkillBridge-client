"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, X } from "lucide-react";

interface TutorFiltersProps {
  onSearch: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
  categories: Array<{ id: string; name: string }>;
}

export function TutorFilters({
  onSearch,
  onCategoryChange,
  onPriceRangeChange,
  categories,
}: TutorFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onPriceRangeChange(values[0], values[1]);
  };

  const handleReset = () => {
    setSearchQuery("");
    setPriceRange([0, 200]);
    setSelectedCategory("all");
    onSearch("");
    onCategoryChange("all");
    onPriceRangeChange(0, 200);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 space-y-6 sticky top-24">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-gray-700">Search</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Search by name or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button
            onClick={handleSearch}
            size="icon"
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-gray-700">
          Price Range: <span className="text-blue-600">${priceRange[0]} - ${priceRange[1]}/hr</span>
        </h3>
        <Slider
          min={0}
          max={200}
          step={10}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mt-4"
        />
      </div>
    </div>
  );
}
