interface MovieReviewResponse {
  id: number;
  page: number;
  results: MovieReviewResult[];
  total_pages: number;
  total_results: number;
}

interface MovieReviewResult {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
}

interface AuthorDetails {
  avatar_path: null | string;
  name: string;
  rating: number;
  username: string;
}

export type { MovieReviewResponse, MovieReviewResult, AuthorDetails };
