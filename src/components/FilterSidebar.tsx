import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Category { id: string; name: string; count?: number }
interface Collection { id: string; label: string }

interface Props {
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (id: string) => void;
  metals: string[];
  selectedMetals: string[];
  toggleMetal: (name: string) => void;
  collections: Collection[];
  selectedCollections: string[];
  toggleCollection: (id: string) => void;
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
  maxPrice?: number;
  clearFilters: () => void;
  activeFiltersCount?: number;
  formatPrice?: (n: number) => string;
}

const FilterSidebar: React.FC<Props> = ({
  categories,
  selectedCategories,
  toggleCategory,
  metals,
  selectedMetals,
  toggleMetal,
  collections,
  selectedCollections,
  toggleCollection,
  priceRange,
  setPriceRange,
  maxPrice = 300000,
  clearFilters,
  activeFiltersCount = 0,
  formatPrice = (n: number) => `₹${n.toLocaleString()}`,
}) => {
  return (
    <div role="region" aria-labelledby="filters-heading" className="rounded-2xl border border-border/40 bg-cream p-6 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 id="filters-heading" className="font-display text-lg font-bold uppercase tracking-wider">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary hover:bg-primary/10 transition-colors" aria-label="Clear filters">
            Clear
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-4 mb-6">
        <h4 className="text-xs font-semibold tracking-widest text-muted-foreground">Category</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                className="rounded-md border-primary/30"
              />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{category.name}</span>
              <span className="ml-auto inline-flex items-center justify-center h-7 min-w-[36px] rounded-full bg-cream text-muted-foreground border border-border px-2 text-xs font-medium">{category.count ?? 0}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator className="border-border/30" />

      {/* Metals */}
      <div className="space-y-4 my-6">
        <h4 className="text-xs font-semibold tracking-widest text-muted-foreground">Gold Purity</h4>
        <div className="space-y-3">
          {metals.map((metal) => (
            <label key={metal} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedMetals.includes(metal)}
                onCheckedChange={() => toggleMetal(metal)}
                className="rounded-md border-primary/30"
              />
              <span className="text-foreground group-hover:text-primary transition-colors">{metal}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator className="border-border/30" />

      {/* Collections */}
      <div className="space-y-4 my-6">
        <h4 className="text-xs font-semibold tracking-widest text-muted-foreground">Collections</h4>
        <div className="space-y-3">
          {collections.map((collection) => (
            <label key={collection.id} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox
                checked={selectedCollections.includes(collection.id)}
                onCheckedChange={() => toggleCollection(collection.id)}
                className="rounded-md border-primary/30"
              />
              <span className="text-foreground group-hover:text-primary transition-colors">{collection.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator className="border-border/30" />

      {/* Price Range */}
      <div className="space-y-4 mt-6">
        <h4 className="text-xs font-semibold tracking-widest text-muted-foreground">Price Range</h4>
        <Slider value={priceRange} onValueChange={setPriceRange} max={maxPrice} step={5000} className="mb-2" aria-label="Price range" />
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-primary">{formatPrice(priceRange[0])}</span>
          <span className="font-medium text-primary">{formatPrice(priceRange[1])}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
