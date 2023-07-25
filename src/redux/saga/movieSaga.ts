import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { ConfigureRootObject } from '@/interface/I_Configuration';
import { MovieNowPlayingResponse, RootResponse } from '@/interface/I_Movie';
import getConfigurationApi from '@/server/api/getConfiguration';
import getMovie from '@/server/api/getmovie';
import { getNowPlaying, getSearchList, setNowPlaying, setSearchList } from '@/Slice/movieSlice';

function* handleGetSearchList(action: PayloadAction<string>) {
  try {
    // get search result
    const res: AxiosResponse<RootResponse> = yield call(getMovie.getSearchList, {
      query: action.payload,
    });
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
    
    const { data: configureData } = configurationRes;

    // mapping image configuration base
    const mappingResult = {
      ...configureData,
      results: data.results.map((item) => {
        return {
          ...item,
          poster_path: `${configureData.images.secure_base_url}${configureData.images.poster_sizes[4]}/${item.poster_path}`,
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
