import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, Search, Grid, List, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import FilterSidebar from "@/components/FilterSidebar";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories, formatPrice } from "@/data/products";
import AnimatedPage from "@/components/AnimatedPage";
import { slideUpVariants, drawerVariants } from "@/lib/animations";

const Catalogue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const maxProductPrice = Math.max(...products.map((p) => p.price), 300000);
  const [priceRange, setPriceRange] = useState([0, maxProductPrice]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : []
  );
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const metals = ["24K Gold", "22K Gold"];
  const collections = [
    { id: "lightweight", label: "Lightweight Jewellery" },
    { id: "diamond", label: "Diamond Collection" },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter((p) => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by metal/karatage
    if (selectedMetals.length > 0) {
      result = result.filter((p) => selectedMetals.includes(p.metal));
    }

    // Filter by collections
    if (selectedCollections.includes("lightweight")) {
      result = result.filter((p) => p.isLightweight);
    }
    if (selectedCollections.includes("diamond")) {
      result = result.filter((p) => p.isDiamond);
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case "rating":
        result.sort((a, b) => ((b as any).rating || 0) - ((a as any).rating || 0));
        break;
      default:
        // Featured - best sellers first
        result = result.filter((p) => p.isBestSeller).concat(result.filter((p) => !p.isBestSeller));
    }

    return result;
  }, [searchQuery, selectedCategories, selectedMetals, selectedCollections, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleMetal = (metal: string) => {
    setSelectedMetals((prev) =>
      prev.includes(metal) ? prev.filter((m) => m !== metal) : [...prev, metal]
    );
  };

  const toggleCollection = (collection: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collection)
        ? prev.filter((c) => c !== collection)
        : [...prev, collection]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedMetals([]);
    setSelectedCollections([]);
    setPriceRange([0, 300000]);
    setSearchParams({});
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedMetals.length +
    selectedCollections.length +
    (priceRange[0] > 0 || priceRange[1] < 300000 ? 1 : 0);

  return (
    <AnimatedPage className="min-h-screen bg-background">
      <Header />

      <main className="pb-20">
        {/* Modern Page Header with South Indian Jewelry Background */}
        <section className="relative overflow-hidden py-16 lg:py-20 min-h-[520px]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1752786768226-b624a5261654?auto=format&fit=crop&w=1920&q=80"
              alt="South Indian bride adorned in traditional gold jewellery"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              variants={slideUpVariants}
              initial="initial"
              animate="animate"
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block text-gold font-body tracking-widest uppercase text-sm mb-4">
                Traditional South Indian Collection
              </span>
              <h1 className="font-elegant text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Heritage Jewelry
                <span className="block text-gold-light">Timeless Craftsmanship</span>
              </h1>
              <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Discover our exquisite collection of traditional South Indian jewelry, 
                featuring intricate designs inspired by centuries of cultural heritage and craftsmanship.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 -mt-8 relative z-20">
          {/* Modern Toolbar Card */}
          <Card className="bg-background/95 backdrop-blur-md border-border/50 shadow-xl mb-8">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Left Section - Search & Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 w-full lg:w-auto">
                  {/* Modern Search Bar */}
                  <div className="relative flex-1 w-full sm:max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search luxury jewelry..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-14 pr-4 h-14 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl bg-background/50 backdrop-blur-sm"
                    />
                  </div>

                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="lg:hidden w-full sm:w-auto"
                    size="lg"
                  >
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </div>

                {/* Right Section - View Mode & Sort */}
                <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                  {/* Modern View Mode Toggle */}
                  <div className="hidden sm:flex items-center bg-muted/30 rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-md h-10 w-10 p-0"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-md h-10 w-10 p-0"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Modern Sort Dropdown */}
                  <div className="flex items-center gap-3 flex-1 sm:flex-initial">
                    <span className="text-sm font-body text-muted-foreground hidden sm:inline">Sort</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-48 h-10 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-border/50">
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest Arrivals</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Modern Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-body text-muted-foreground">Active filters:</span>
                    {selectedCategories.map((cat) => (
                      <Badge 
                        key={cat} 
                        variant="secondary" 
                        className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {categories.find(c => c.id === cat)?.name}
                        <button 
                          onClick={() => toggleCategory(cat)} 
                          className="ml-1 hover:text-destructive transition-colors"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedMetals.map((metal) => (
                      <Badge 
                        key={metal} 
                        variant="secondary" 
                        className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {metal}
                        <button 
                          onClick={() => toggleMetal(metal)} 
                          className="ml-1 hover:text-destructive transition-colors"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedCollections.map((col) => (
                      <Badge 
                        key={col} 
                        variant="secondary" 
                        className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {collections.find(c => c.id === col)?.label}
                        <button 
                          onClick={() => toggleCollection(col)} 
                          className="ml-1 hover:text-destructive transition-colors"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {(priceRange[0] > 0 || priceRange[1] < 300000) && (
                      <Badge 
                        variant="secondary" 
                        className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                        <button 
                          onClick={() => setPriceRange([0, 300000])} 
                          className="ml-1 hover:text-destructive transition-colors"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters} 
                      className="text-xs h-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="flex gap-8">
            {/* Modern Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-20">
                <FilterSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  metals={metals}
                  selectedMetals={selectedMetals}
                  toggleMetal={toggleMetal}
                  collections={collections}
                  selectedCollections={selectedCollections}
                  toggleCollection={toggleCollection}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  maxPrice={maxProductPrice}
                  clearFilters={clearFilters}
                  activeFiltersCount={activeFiltersCount}
                  formatPrice={formatPrice}
                />
              </div>
            </aside>

            {/* Mobile Filters */}
            <AnimatePresence>
              {isFilterOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <motion.aside
                    variants={drawerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="fixed left-0 top-0 h-full w-80 bg-background z-50 lg:hidden overflow-y-auto"
                  >
                    <div className="p-6 space-y-8">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-lg font-bold uppercase tracking-wider">
                          Filters
                        </h3>
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {activeFiltersCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-primary hover:underline"
                        >
                          Clear All Filters
                        </button>
                      )}

                      <FilterSidebar
                        categories={categories}
                        selectedCategories={selectedCategories}
                        toggleCategory={toggleCategory}
                        metals={metals}
                        selectedMetals={selectedMetals}
                        toggleMetal={toggleMetal}
                        collections={collections}
                        selectedCollections={selectedCollections}
                        toggleCollection={toggleCollection}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        maxPrice={maxProductPrice}
                        clearFilters={clearFilters}
                        activeFiltersCount={activeFiltersCount}
                        formatPrice={formatPrice}
                      />

                      <Button
                        onClick={() => setIsFilterOpen(false)}
                        className="w-full h-12"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            {/* Modern Products Grid */}
            <div className="flex-1 min-w-0">
              {paginatedProducts.length > 0 ? (
                <>
                  {/* Modern Grid/List View */}
                  <div className={
                    viewMode === "grid" 
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" 
                      : "space-y-6"
                  }>
                    {paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group"
                      >
                        {viewMode === "grid" ? (
                          <div className="relative transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                            <ProductCard
                              product={product}
                              index={index}
                            />
                            {/* Improved Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                              <Button className="w-full bg-gold hover:bg-gold-dark text-foreground shadow-lg">
                                Quick View
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Card className="flex flex-col sm:flex-row gap-6 p-6 transition-all duration-300 border-border/50 hover:border-primary/50 bg-background/80 backdrop-blur-sm group hover:shadow-2xl hover:-translate-y-1">
                            <div className="w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden flex-shrink-0 transform transition-transform duration-500 group-hover:scale-110">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                    {product.name}
                                  </h3>
                                  <p className="text-sm text-muted-foreground capitalize mt-1">
                                    {product.category}
                                  </p>
                                </div>
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                  {product.isNew && (
                                    <Badge variant="secondary" className="text-xs bg-gold/20 text-gold-dark border-gold/30">
                                      New
                                    </Badge>
                                  )}
                                  {product.isBestSeller && (
                                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                                      Bestseller
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3 mb-4 flex-wrap">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-gold text-gold" />
                                  <span className="text-sm font-medium">{(product as any).rating || 4.5}</span>
                                </div>
                                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                                <span className="text-sm text-muted-foreground">
                                  {product.metal} • {product.purity}
                                </span>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                  <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through ml-2">
                                      {formatPrice(product.originalPrice)}
                                    </span>
                                  )}
                                </div>
                                <Button size="sm" className="bg-gradient-mgm hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </Card>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Modern Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="w-full sm:w-auto border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </Button>
                      
                      <div className="flex items-center gap-2 flex-wrap justify-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 p-0 transition-all duration-300 hover:scale-110 ${
                              currentPage === page 
                                ? "bg-gradient-mgm shadow-lg scale-110" 
                                : "border-primary/30 hover:bg-primary/10"
                            }`}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="w-full sm:w-auto border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <Card className="max-w-lg mx-auto bg-background/80 backdrop-blur-sm border-border/50">
                    <div className="p-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                        <Search className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-2xl font-elegant font-bold text-foreground mb-3">
                        No luxury pieces found
                      </h3>
                      <p className="text-muted-foreground mb-8 text-lg">
                        {searchQuery 
                          ? `No jewelry matches your search "${searchQuery}"`
                          : "No pieces match your current filters"
                        }
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {searchQuery && (
                          <Button 
                            variant="outline" 
                            onClick={() => setSearchQuery("")} 
                            className="border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                          >
                            Clear Search
                          </Button>
                        )}
                        <Button 
                          onClick={clearFilters} 
                          className="bg-gradient-mgm hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </AnimatedPage>
  );
};

export default Catalogue;