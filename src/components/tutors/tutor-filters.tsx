"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

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

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handlePriceChange = (values: number[]) => {
        setPriceRange(values);
        onPriceRangeChange(values[0], values[1]);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
            <div>
                <h3 className="font-semibold mb-3">Search</h3>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search by name or subject..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <Button onClick={handleSearch} size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <Select onValueChange={onCategoryChange}>
                    <SelectTrigger>
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
                <h3 className="font-semibold mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}/hr
                </h3>
                <Slider
                    min={0}
                    max={200}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mt-2"
                />
            </div>
        </div>
    );
}
