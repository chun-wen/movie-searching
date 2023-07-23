import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MovieDetail, RootResponse } from '@/interface/I_Movie';

export interface MovieState {
  movieData: RootResponse;
  movieList: MovieDetail;
}

// Define the initial state using that type
const initialState: MovieState = {
  movieData: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  movieList: {} as MovieDetail,
};

export const movieSlice = createSlice({
  name: 'movie',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getMovieList: (state) => undefined,
    setMovieList: (state, action: PayloadAction<any>) => {
      state.movieList = action.payload;
    },
  },
});

export const { getMovieList, setMovieList } = movieSlice.actions;

export default movieSlice.reducer;
