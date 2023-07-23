import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { RootResponse } from '@/interface/I_Movie';
import getMovie from '@/server/api/getmovie';
import { getMovieList, setMovieList } from '@/Slice/movieSlice';

function* handleGetMovieList() {
  try {
    const res: AxiosResponse<RootResponse> = yield call(getMovie.getMovieList);
    const { data } = res;
    yield put(setMovieList(data));
  } catch (err) {
    console.error(err);
  }
}

function handleSearchMovie(){

}

export function* watchGetMovieList() {
  yield takeLatest(getMovieList.type, handleGetMovieList);
}
