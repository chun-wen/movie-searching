interface MovieGeneralResponse {
  page: number;
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
}

interface MovieNowPlayingResponse extends MovieGeneralResponse {
  dates: Dates;
}

interface MovieInfo {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
  id: number;
  original_language?: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  // determine whether add to watchList Before
  isCollet: boolean;
}

interface Dates {
  maximum: Date;
  minimum: Date;
}

interface SearchProps {
  query: SortField;
  region: string;
}

type SearchDataType = Pick<MovieInfo, 'poster_path' | 'original_title' | 'original_language' | 'overview' | 'popularity'> & {
  image: {
    poster_path: string;
    original_title: string;
  }
}

export enum OriginalLanguage {
  En = 'en',
  Es = 'es',
  Uk = 'uk',
}
export enum SortField {
  poupularity_asc = 'popularity.asc',
}

export type { MovieGeneralResponse, MovieNowPlayingResponse, MovieInfo, Dates, SearchProps,SearchDataType };
