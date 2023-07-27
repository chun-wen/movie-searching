import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SorterResult } from 'antd/es/table/interface';

import { ConfigureRootObject } from '@/Interface/I_Configuration';
import { MovieInfo, MovieNowPlayingResponse, RootResponse, SortOrder } from '@/Interface/I_Movie';

import paginateArray from '@/Utils/paginate';
import sortingArray from '@/Utils/sorting';

export interface MovieState {
  movieData: RootResponse;
  searchList: MovieInfo[];
  movie_nowPlayingList: MovieInfo[];
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
  isloading: true,
};

export const movieSlice = createSlice({
  name: 'movie',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getSearchList: (state, action: PayloadAction<string>) => undefined,
    setSearchList: (state, action: PayloadAction<RootResponse>) => {
      state.movieData = action.payload;
      state.searchList = action.payload.results;
      state.isloading = false;
    },
    filterSearchList: (state, action: PayloadAction<any>) => {
      const sortingData = sortingArray({
        data: state.searchList,
        order: action.payload.order,
        column: action.payload.column,
      });

      const paginationData = paginateArray({
        data: state.searchList,
        pageSize: 20,
        pageNumber: action.payload.currentPage,
      });

      state.searchList = paginationData;
    },
    getNowPlaying: (state) => undefined,
    setNowPlaying: (state, action: PayloadAction<MovieInfo[]>) => {
      state.movie_nowPlayingList = action.payload;
      state.isloading = false;
    },
  },
});

export const { getSearchList, getNowPlaying, setSearchList, setNowPlaying, filterSearchList } =
  movieSlice.actions;

export default movieSlice.reducer;
