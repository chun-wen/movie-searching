import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { ConfigureRootObject } from '@/Interface/I_Configuration';
import { MovieGeneralResponse, MovieNowPlayingResponse } from '@/Interface/I_MovieGeneral';

import { getNowPlaying, getSearchList, setNowPlaying, setSearchList } from '@/Slices/movieSlice';

import getConfigurationApi from '@/server/api/getConfiguration';
import getMovie from '@/server/api/getmovie';

function* handleGetSearchList(action: PayloadAction<string>) {
  try {
    // get search result
    const res: AxiosResponse<MovieGeneralResponse> = yield call(
      getMovie.getSearchList,
      action.payload,
    );
    const { data } = res;

    yield put(setSearchList(data));
  } catch (err) {
    console.error(err);
  }
}

function* handleGetNowPlaying() {
  try {
    const res: AxiosResponse<MovieNowPlayingResponse> = yield call(getMovie.getNowPlaying);
    const { data } = res;

    // get configuration info
    const configurationRes: AxiosResponse<ConfigureRootObject> = yield call(
      getConfigurationApi.getDetails,
    );

    const {
      data: { images },
    } = configurationRes;

    // mapping image configuration base
    const mappingResult = {
      ...data,
      results: data.results.map((item) => {
        return {
          ...item,
          poster_path: `${images.secure_base_url}${images.poster_sizes[4]}/${item.poster_path}`,
        };
      }),
    };
    console.log(mappingResult);
    yield put(setNowPlaying(mappingResult.results));
  } catch (err) {
    console.error(err);
  }
}

export function* watchgetSearchList() {
  yield takeLatest(getSearchList.type, handleGetSearchList);
}

export function* watchGetNowPlaying() {
  yield takeLatest(getNowPlaying.type, handleGetNowPlaying);
}
