import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TableParams } from '@/components/table';
import Toast from '@/components/toast';
import { MovieGeneralResponse, MovieInfo } from '@/interface/I_MovieGeneral';
import handleTableChange from '@/utils/handleTableChange';

export interface UserState {
  collectMovieList: MovieGeneralResponse;
  collectMovie: MovieInfo[];
  isloading: boolean;
}
const initialState: UserState = {
  collectMovieList: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  collectMovie: [] as MovieInfo[],
  isloading: true,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCollectionMovie: (state) => undefined,
    setCollectionMovie: (state, action: PayloadAction<MovieInfo>) => {
      // mapping movieData
      state.collectMovie = [...state.collectMovie, action.payload];
      state.isloading = false;

      Toast({
        message: '',
        description: '',
        status: 'success',
      });
    },
    getCollectionMovieList: (state, action: PayloadAction<MovieGeneralResponse>) => {
      state.collectMovieList = action.payload;
    },
    filterCollectionMovie: (state, action: PayloadAction<TableParams>) => {
      const filterSearch = handleTableChange({ ...action.payload, data: state.collectMovie });
      state.collectMovie = filterSearch;
    },
  },
});

export const { getCollectionMovie, setCollectionMovie, filterCollectionMovie } = userSlice.actions;
export default userSlice.reducer;
