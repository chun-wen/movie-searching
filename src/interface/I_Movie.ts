export interface RootResponse {
  page: number;
  results: MovieDetail[];
  total_pages: number;
  total_results: number;
}

export interface MovieListResponse extends RootResponse {
  dates: Dates;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Dates {
  maximum: Date;
  minimum: Date;
}

export enum OriginalLanguage {
  En = 'en',
  Es = 'es',
  Uk = 'uk',
}
