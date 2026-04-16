import { useState, useCallback } from "react";
import { Star, ThumbsUp, CheckCircle, ChevronDown } from "lucide-react";
import { getReviewsForProduct, getRatingDistribution, getAverageRating, type Review } from "@/data/reviews";
import WriteReview from "@/components/WriteReview";

function StarRating({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} ${i < rating ? "fill-star text-star" : "text-muted"}`} />
      ))}
    </div>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-6 text-right text-muted-foreground">{stars}</span>
      <Star className="w-3 h-3 fill-star text-star" />
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-star rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 text-xs text-muted-foreground">{count}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState(false);

  return (
    <div className="bg-card rounded-xl border border-border p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-foreground text-sm">{review.userName}</span>
            {review.verified && (
              <span className="flex items-center gap-0.5 text-xs text-primary">
                <CheckCircle className="w-3 h-3" /> Verified Purchase
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={review.rating} size="w-3.5 h-3.5" />
            <span className="text-xs text-muted-foreground">
              {new Date(review.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
            </span>
          </div>
          {review.title && <p className="font-semibold text-foreground text-sm mt-2">{review.title}</p>}
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{review.comment}</p>
          <button
            onClick={() => setHelpful(true)}
            disabled={helpful}
            className={`flex items-center gap-1.5 mt-3 text-xs transition-colors ${
              helpful ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            Helpful ({helpful ? review.helpful + 1 : review.helpful})
          </button>
        </div>
      </div>
    </div>
  );
}

function getUserReviews(productId: number): Review[] {
  try {
    const all = JSON.parse(localStorage.getItem("cartify-user-reviews") || "[]");
    return all.filter((r: Review) => r.productId === productId);
  } catch {
    return [];
  }
}

type SortOption = "recent" | "highest" | "lowest" | "helpful";

export default function ProductReviews({ productId, productRating, productReviewCount }: {
  productId: number;
  productRating: number;
  productReviewCount: number;
}) {
  const [sort, setSort] = useState<SortOption>("recent");
  const [showAll, setShowAll] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewSubmitted = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const seedReviews = getReviewsForProduct(productId);
  const userReviews = getUserReviews(productId);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _refresh = refreshKey; // trigger re-render
  const allReviews = [...userReviews, ...seedReviews];

  const avgRating = allReviews.length > 0 ? getAverageRating(allReviews) : productRating;
  const totalCount = allReviews.length > 0 ? allReviews.length : productReviewCount;
  const distribution = getRatingDistribution(allReviews);

  const sorted = [...allReviews].sort((a, b) => {
    switch (sort) {
      case "highest": return b.rating - a.rating;
      case "lowest": return a.rating - b.rating;
      case "helpful": return b.helpful - a.helpful;
      default: return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const visible = showAll ? sorted : sorted.slice(0, 4);

  return (
    <section className="mt-16">
      <h2 className="section-title mb-8">Ratings & Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Summary */}
        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <p className="text-5xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
          <StarRating rating={Math.round(avgRating)} size="w-5 h-5" />
          <p className="text-sm text-muted-foreground mt-2">
            Based on {totalCount.toLocaleString("en-IN")} ratings
          </p>
        </div>

        {/* Distribution */}
        <div className="md:col-span-2 bg-card rounded-2xl border border-border p-6">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <RatingBar key={stars} stars={stars} count={distribution[stars - 1]} total={allReviews.length} />
            ))}
          </div>
        </div>
      </div>

      {/* Write a Review */}
      <div className="mb-8">
        <WriteReview productId={productId} onReviewSubmitted={handleReviewSubmitted} />
      </div>

      {/* Sort & List */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{allReviews.length} reviews</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="input-field text-sm py-2 w-auto"
        >
          <option value="recent">Most Recent</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visible.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      {!showAll && allReviews.length > 4 && (
        <button
          onClick={() => setShowAll(true)}
          className="btn-secondary w-full mt-6 flex items-center justify-center gap-2"
        >
          Show All Reviews <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </section>
  );
}
