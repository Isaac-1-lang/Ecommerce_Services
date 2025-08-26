// app/components/ProductReviews.tsx
"use client";
import { useEffect, useState } from "react";
import { reviewService, type Review } from "../services/reviewService";
import { useAuth } from "../hooks/useAuth";

export default function ProductReviews({ productId, refreshToken }: { productId: string; refreshToken?: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avg, setAvg] = useState<{ averageRating: number; totalReviews: number } | null>(null);
  const { user } = useAuth();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, avgRes] = await Promise.all([
        reviewService.getProductReviews(productId),
        reviewService.getAverageRating(productId)
      ]);
      setReviews(data);
      setAvg(avgRes);
    } catch (e: any) {
      setError(e.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, refreshToken]);

  const handleHelpful = async (id: string, helpful: boolean) => {
    try {
      const updated = await reviewService.markReviewHelpful(id, helpful);
      setReviews(prev => prev.map(r => r.id === updated.id ? updated : r));
    } catch (e) {
      // ignore error; UI stays
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await reviewService.deleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      // ignore error for now
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Customer Reviews</h3>
      {avg && (
        <p className="text-sm text-gray-700 mb-2">Average: {avg.averageRating.toFixed(1)} / 5 • {avg.totalReviews} reviews</p>
      )}
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r) => (
          <div key={r.id} className="border p-2 my-2 rounded">
            <div className="flex items-center justify-between">
              <p className="font-medium">{r.userName || "Anonymous"}</p>
              <span>⭐ {r.rating}</span>
            </div>
            {r.title && <p className="font-semibold text-sm">{r.title}</p>}
            <p className="text-sm">{r.comment}</p>
            <div className="flex gap-3 text-xs mt-2">
              <button onClick={() => handleHelpful(r.id, true)} className="underline">
                Helpful ({r.helpful})
              </button>
              <button onClick={() => handleHelpful(r.id, false)} className="underline">
                Not helpful ({r.notHelpful})
              </button>
              {user && user.id === r.userId && (
                <span className="text-gray-400">•</span>
              )}
              {user && user.id === r.userId && (
                <button className="underline">Edit</button>
              )}
              {user && user.id === r.userId && (
                <button className="underline text-red-600" onClick={() => handleDelete(r.id)}>Delete</button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
