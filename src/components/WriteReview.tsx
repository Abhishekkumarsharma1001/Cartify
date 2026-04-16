import { useState } from "react";
import { Star, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface WriteReviewProps {
  productId: number;
  onReviewSubmitted: () => void;
}

export default function WriteReview({ productId, onReviewSubmitted }: WriteReviewProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6 text-center">
        <p className="text-muted-foreground mb-3">Please log in to write a review</p>
        <Link to="/login" className="btn-primary inline-block px-6 py-2">Log In</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a star rating");
      return;
    }
    if (comment.trim().length < 10) {
      setError("Review must be at least 10 characters");
      return;
    }

    const review = {
      id: Date.now(),
      productId,
      userName: user.name,
      avatar: user.name.charAt(0).toUpperCase(),
      rating,
      title: "",
      comment: comment.trim(),
      date: new Date().toISOString(),
      verified: true,
      helpful: 0,
    };

    const existing = JSON.parse(localStorage.getItem("cartify-user-reviews") || "[]");
    existing.push(review);
    localStorage.setItem("cartify-user-reviews", JSON.stringify(existing));

    setSubmitted(true);
    setRating(0);
    setComment("");
    onReviewSubmitted();

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Write a Review</h3>

      {submitted && (
        <div className="mb-4 p-3 bg-primary/10 text-primary rounded-lg text-sm font-medium">
          ✓ Your review has been submitted!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star rating */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Your Rating</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-7 h-7 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-star text-star"
                      : "text-muted"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
              </span>
            )}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={4}
            className="input-field w-full resize-none"
          />
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <button
          type="submit"
          className="btn-primary flex items-center gap-2 px-6 py-2.5"
        >
          <Send className="w-4 h-4" /> Submit Review
        </button>
      </form>
    </div>
  );
}
