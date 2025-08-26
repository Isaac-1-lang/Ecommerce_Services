import api from "../lib/api";

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userProfilePicture?: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  productId: string;
  rating: number;
  title: string;
  comment: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  title?: string;
  comment?: string;
}

export interface ReviewSearchParams {
  productId?: string;
  rating?: number;
  sort?: 'newest' | 'oldest' | 'rating' | 'helpful';
  page?: number;
  size?: number;
}

export interface JavaReviewResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface JavaReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userProfilePicture?: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Transform Java review to frontend review format
const transformJavaReview = (javaReview: JavaReview): Review => {
  return {
    id: javaReview.id,
    productId: javaReview.productId,
    userId: javaReview.userId,
    userName: javaReview.userName,
    userProfilePicture: javaReview.userProfilePicture,
    rating: javaReview.rating,
    title: javaReview.title,
    comment: javaReview.comment,
    helpful: javaReview.helpful,
    notHelpful: javaReview.notHelpful,
    isVerified: javaReview.isVerified,
    createdAt: javaReview.createdAt,
    updatedAt: javaReview.updatedAt,
  };
};

export const reviewService = {
  async getReviews(params?: ReviewSearchParams): Promise<Review[]> {
    try {
      console.log('Fetching reviews with params:', params);
      const queryParams = new URLSearchParams();
      
      if (params?.productId) queryParams.append('productId', params.productId);
      if (params?.rating) queryParams.append('rating', params.rating.toString());
      if (params?.sort) queryParams.append('sort', params.sort);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.size) queryParams.append('size', params.size.toString());

      // Backend exposes specific endpoints for product and user reviews
      if (params?.productId) {
        console.log('Fetching product reviews for:', params.productId);
        const resp = await api.get<JavaReviewResponse<JavaReview[]>>(`/api/v1/reviews/product/${params.productId}`, {
          params: { page: params.page ?? 0, size: params.size ?? 10, sortBy: 'createdAt', sortDirection: 'desc' }
        });
        console.log('Product reviews response:', resp.data);
        if (resp.data.success && resp.data.data) return resp.data.data.map(transformJavaReview);
        return [];
      }
      // Search endpoint for broader queries
      console.log(' Using search endpoint for reviews');
      const searchResp = await api.post<JavaReviewResponse<JavaReview[]>>('/api/v1/reviews/search', {
        productId: params?.productId,
        rating: params?.rating,
        sort: params?.sort,
        page: params?.page ?? 0,
        size: params?.size ?? 10,
      });
      console.log('Search response:', searchResp.data);
      if (searchResp.data.data) return searchResp.data.data.map(transformJavaReview);
      return [];
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  },

  async getReviewById(reviewId: string): Promise<Review | null> {
    try {
      console.log('Getting review by ID:', reviewId);
      const response = await api.get<JavaReviewResponse<JavaReview>>(`/api/v1/reviews/${reviewId}`);
      console.log('Get review response:', response.data);

      if (response.data.success && response.data.data) {
        return transformJavaReview(response.data.data);
      }
      
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching review:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch review');
    }
  },

  async getProductReviews(productId: string, params?: Omit<ReviewSearchParams, 'productId'>): Promise<Review[]> {
    return this.getReviews({ ...params, productId });
  },

  async createReview(reviewData: CreateReviewRequest): Promise<Review> {
    try {
      console.log('Creating review:', reviewData);
      const response = await api.post<JavaReviewResponse<JavaReview>>('/api/v1/reviews/create', reviewData);
      console.log('Create review response:', response.data);

      if (response.data.success && response.data.data) {
        return transformJavaReview(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to create review');
    } catch (error: any) {
      console.error('Error creating review:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to create review');
    }
  },

  async updateReview(reviewId: string, reviewData: UpdateReviewRequest): Promise<Review> {
    try {
      console.log('Updating review:', reviewId, reviewData);
      // Swagger shows PUT /api/v1/reviews/update accepting body
      const response = await api.put<JavaReviewResponse<JavaReview>>(`/api/v1/reviews/update`, { reviewId, ...reviewData });
      console.log('Update review response:', response.data);

      if (response.data.success && response.data.data) {
        return transformJavaReview(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to update review');
    } catch (error: any) {
      console.error('Error updating review:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to update review');
    }
  },

  async deleteReview(reviewId: string): Promise<void> {
    try {
      console.log('Deleting review:', reviewId);
      const response = await api.delete<JavaReviewResponse<void>>(`/api/v1/reviews/${reviewId}`);
      console.log('Delete review response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to delete review');
      }
    } catch (error: any) {
      console.error('Error deleting review:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to delete review');
    }
  },

  async markReviewHelpful(reviewId: string, helpful: boolean): Promise<Review> {
    try {
      console.log('Marking review helpful:', reviewId, helpful);
      // Swagger shows POST /api/v1/reviews/{reviewId}/vote with payload
      const response = await api.post<JavaReviewResponse<JavaReview>>(`/api/v1/reviews/${reviewId}/vote`, {
        vote: helpful ? 'up' : 'down'
      });
      console.log('Vote response:', response.data);

      if (response.data.success && response.data.data) {
        return transformJavaReview(response.data.data);
      }
      
      throw new Error(response.data.message || 'Failed to mark review helpful');
    } catch (error: any) {
      console.error('Error marking review helpful:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to mark review helpful');
    }
  },

  async getAverageRating(productId: string): Promise<{ averageRating: number; totalReviews: number }> {
    try {
      console.log('Getting average rating for product:', productId);
      // Swagger shows GET /api/v1/reviews/product/{productId}/stats
      const response = await api.get<JavaReviewResponse<{ averageRating: number; totalReviews: number }>>(`/api/v1/reviews/product/${productId}/stats`);
      console.log('Stats response:', response.data);

      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      
      return { averageRating: 0, totalReviews: 0 };
    } catch (error: any) {
      console.error('Error getting average rating:', error);
      return { averageRating: 0, totalReviews: 0 };
    }
  },

  async getUserReviews(userId: string): Promise<Review[]> {
    try {
      console.log('Getting user reviews for:', userId);
      // Backend exposes /api/v1/reviews/user for the authenticated user (no userId path segment)
      const response = await api.get<JavaReviewResponse<JavaReview[]>>(`/api/v1/reviews/user`);
      console.log('User reviews response:', response.data);

      if (response.data.success && response.data.data) {
        return response.data.data.map(transformJavaReview);
      }
      
      return [];
    } catch (error: any) {
      console.error('Error fetching user reviews:', error);
      return [];
    }
  }
};
