import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { ConfigureRootObject } from '@/Interface/I_Configuration';
import {
  MovieGeneralResponse,
  MovieInfo,
  MovieNowPlayingResponse
} from '@/Interface/I_MovieGeneral';

import {
  getMovieDetail,
  getNowPlaying,
  getSearchList,
  ModalMovieDetail,
  setMovieDetail,
  setNowPlaying,
  setSearchList
} from '@/Slices/movieSlice';

import { Cast } from '@/interface/I_MovieCredit';
import { MovieDetailResponse } from '@/interface/I_MovieDetail';
import { MovieReviewResponse } from '@/interface/I_MovieReview';
import getConfigurationApi from '@/server/api/getConfiguration';
import getMovie from '@/server/api/getmovie';

type MovieDetailTuple = [
  AxiosResponse<MovieDetailResponse>,
  AxiosResponse<Cast[]>,
  AxiosResponse<MovieReviewResponse>,
];

function* handleGetSearchList(action: PayloadAction<{ query: string; page: number }>) {
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
    // console.log(mappingResult);
    yield put(setNowPlaying(mappingResult.results));
  } catch (err) {
    console.error(err);
  }
}

function* handleGetMovieDetail(action: PayloadAction<{ id: number }>) {
  try {
    const res: AxiosResponse<any>[] = yield all([
      call(getMovie.getMovieDetails, action.payload.id),
      call(getMovie.getMovieCredits, action.payload.id),
      call(getMovie.getMovieReviews, action.payload.id),
    ]);

    const [movieInfo, movieCast, movieReview] = res;

    const { images } = yield select((state) => state.configuration);

    yield put(
      setMovieDetail({
        movieInfo: {
          ...movieInfo.data,
          poster_path: `${images.secure_base_url}${images.poster_sizes[4]}${movieInfo.data.poster_path}`,
        },
        movieCast: movieCast.data,
        movieReview: movieReview.data,
      }),
    );
  } catch (err) {
    console.error(err);
  }
}

export function* watchGetSearchList() {
  yield takeLatest(getSearchList.type, handleGetSearchList);
}

export function* watchGetNowPlaying() {
  yield takeLatest(getNowPlaying.type, handleGetNowPlaying);
}

export function* watchGetMovieDetail() {
  yield takeLatest(getMovieDetail.type, handleGetMovieDetail);
}
