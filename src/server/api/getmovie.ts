import { SearchProps } from '@/Interface/I_Movie';

import { BasicService } from '../index';

class GetMovieApi extends BasicService {
  getSearchList = (query: string) => this.fetcher.get(`/search/movie?query=${query}`);
  getNowPlaying = () => this.fetcher.get('/movie/now_playing');
  getMovieDetails = (id: string) => this.fetcher.get(`/movie/${id}`);
  getMovieReviews = (id: string) => this.fetcher.get(`/movie/${id}/reviews`);
  getMovieCredits = (id: string, page: number) =>
    this.fetcher.get(`/movie/${id}/credits?page=${page}`);
}

const getMovie = new GetMovieApi();

export default getMovie;
