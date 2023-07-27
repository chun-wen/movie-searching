import { SearchProps } from '@/Interface/I_Movie';

import { BasicService } from '../index';

class GetMovieApi extends BasicService {
  getSearchList = (query: string) => this.fetcher.get(`/search/movie?query=${query}`);
  getNowPlaying = () => this.fetcher.get('/movie/now_playing');
}

const getMovie = new GetMovieApi();

export default getMovie;
