import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

type SortOption = "default" | "price-low" | "price-high" | "rating";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sort, setSort] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 75000]);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);
    switch (sort) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [searchParam, selectedCategory, sort, priceRange, minRating]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSort("default");
    setPriceRange([0, 75000]);
    setMinRating(0);
    setSearchParams({});
  };

  const hasFilters = selectedCategory || sort !== "default" || priceRange[0] > 0 || priceRange[1] < 75000 || minRating > 0 || searchParam;

  return (
    <Layout>
      <div className="container-main py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="section-title">
              {searchParam ? `Results for "${searchParam}"` : selectedCategory ? categories.find((c) => c.id === selectedCategory)?.name || "Products" : "All Products"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="input-field text-sm py-2 w-auto"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="btn-secondary py-2 px-4 text-sm flex items-center gap-2 lg:hidden">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${filtersOpen ? "fixed inset-0 z-50 bg-background p-6 overflow-auto" : "hidden"} lg:block lg:static lg:w-56 lg:flex-shrink-0`}>
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h2 className="font-bold text-lg text-foreground">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-destructive hover:underline mb-4">Clear all filters</button>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="cat" checked={selectedCategory === ""} onChange={() => setSelectedCategory("")} className="accent-primary" />
                    <span className="text-muted-foreground">All</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="cat" checked={selectedCategory === cat.id} onChange={() => setSelectedCategory(cat.id)} className="accent-primary" />
                      <span className="text-muted-foreground">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Price Range (₹)</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number" min={0} max={priceRange[1]} value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="input-field text-sm py-1.5 w-24"
                  />
                  <span className="text-muted-foreground">–</span>
                  <input
                    type="number" min={priceRange[0]} max={100000} value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="input-field text-sm py-1.5 w-24"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[0, 4, 4.5].map((r) => (
                    <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-primary" />
                      <span className="text-muted-foreground">{r === 0 ? "All" : `${r}+ Stars`}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => setFiltersOpen(false)} className="btn-primary w-full mt-6 lg:hidden">Apply Filters</button>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl font-bold text-foreground mb-2">No products found</p>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search term.</p>
                <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
