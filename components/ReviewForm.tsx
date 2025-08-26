"use client";
import { useState } from "react";
import { reviewService, type CreateReviewRequest } from "../services/reviewService";

export default function ReviewForm({ productId, onSubmitted }: { productId: string; onSubmitted?: () => void }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!comment.trim() || rating < 1 || rating > 5) {
      setError("Please provide a comment and a rating between 1 and 5.");
      return;
    }

    setLoading(true);
    try {
      const payload: CreateReviewRequest = { productId, rating, title: title.trim(), comment: comment.trim() };
      await reviewService.createReview(payload);
      setSuccess("Review submitted successfully.");
      setComment("");
      setTitle("");
      setRating(5);
      onSubmitted?.();
    } catch (err: any) {
      setError(err.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (optional)"
        className="border rounded w-full p-2"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="border rounded w-full p-2"
        rows={4}
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded p-2"
        disabled={loading}
      >
        {[1,2,3,4,5].map(star => (
          <option key={star} value={star}>{star} ⭐</option>
        ))}
      </select>
      <button type="submit" disabled={loading} className="bg-blue-500 disabled:opacity-60 text-white px-4 py-2 rounded">
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
