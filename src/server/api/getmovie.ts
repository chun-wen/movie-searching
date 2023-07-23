import { BasicService } from '../index';

class GetMovieApi extends BasicService{
  getMovieList = () => this.fetcher.get('/discover/movie')
}

const getMovie = new GetMovieApi();

export default getMovie;
