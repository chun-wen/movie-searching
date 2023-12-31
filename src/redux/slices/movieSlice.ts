import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ConfigureRootObject } from '@/Interface/I_Configuration';
import { MovieGeneralResponse, MovieInfo } from '@/Interface/I_MovieGeneral';

import { TableParams } from '@/components/table';
import { Cast, MovieCreditRootResponse } from '@/interface/I_MovieCredit';
import { MovieDetailResponse } from '@/interface/I_MovieDetail';
import { MovieReviewResponse, MovieReviewResult } from '@/interface/I_MovieReview';
import handleTableChange from '@/utils/handleTableChange';

export interface ModalMovieDetail {
  movieInfo: MovieDetailResponse;
  movieCrew: Cast[];
  movieReview: MovieReviewResponse;
}

export interface MovieState {
  movieData: MovieGeneralResponse;
  searchList: MovieInfo[];
  movie_nowPlayingList: MovieInfo[];
  movieDetail: ModalMovieDetail;
  isloading: boolean;
}

// Define the initial state using that type
const initialState: MovieState = {
  movieData: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  searchList: [] as MovieInfo[],
  movie_nowPlayingList: [] as MovieInfo[],
  movieDetail: {
    movieInfo: {} as MovieDetailResponse,
    movieCrew: [],
    movieReview: {} as MovieReviewResponse,
  },
  isloading: true,
};

export const movieSlice = createSlice({
  name: 'movie',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getSearchList: (state, action: PayloadAction<{ query: string; page: number }>) => undefined,
    setSearchList: (state, action: PayloadAction<MovieGeneralResponse>) => {
      state.movieData = action.payload;
      state.searchList = action.payload.results;
      state.isloading = false;
    },
    filterSearchList: (state, action: PayloadAction<TableParams>) => {
      const filterSearch = handleTableChange({ ...action.payload, data: state.searchList });
      state.searchList = filterSearch;
    },
    getMovieDetail: (state, action: PayloadAction<{ id: number }>) => undefined,
    setMovieDetail: (state, action: PayloadAction<ModalMovieDetail>) => {
      state.movieDetail = action.payload;
      state.isloading = false;
    },
    getNowPlaying: (state) => undefined,
    setNowPlaying: (state, action: PayloadAction<MovieInfo[]>) => {
      state.movie_nowPlayingList = action.payload;
      state.isloading = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isloading = action.payload;
    },
    getMovieDetailComment: (state, action: PayloadAction<{ id: number; page: number }>) =>
      undefined,
    setMovieDetailComment: (state, action: PayloadAction<MovieReviewResponse>) => {
      state.movieDetail.movieReview = action.payload;
      state.isloading = false;
    },
  },
});

export const {
  getSearchList,
  getNowPlaying,
  setSearchList,
  setNowPlaying,
  filterSearchList,
  getMovieDetail,
  setMovieDetail,
  setIsLoading,
  getMovieDetailComment,
  setMovieDetailComment
} = movieSlice.actions;

export default movieSlice.reducer;
