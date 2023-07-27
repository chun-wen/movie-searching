import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  collectMovieList: [],
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCollectionMovie: (state) => undefined,
    setCollectionMovie: (state, action: PayloadAction<any>) => {
      state.collectMovieList = action.payload;
    },
  },
});

export const { getCollectionMovie, setCollectionMovie } = userSlice.actions;
export default userSlice.reducer;
