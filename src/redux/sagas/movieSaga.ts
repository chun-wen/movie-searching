import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { ConfigureRootObject } from '@/Interface/I_Configuration';
import {
  MovieGeneralResponse,
  MovieInfo,
  MovieNowPlayingResponse,
} from '@/Interface/I_MovieGeneral';

import {
  getMovieDetail,
  getMovieDetailComment,
  getNowPlaying,
  getSearchList,
  ModalMovieDetail,
  setMovieDetail,
  setMovieDetailComment,
  setNowPlaying,
  setSearchList,
} from '@/Slices/movieSlice';

import { Cast } from '@/interface/I_MovieCredit';
import { MovieDetailResponse } from '@/interface/I_MovieDetail';
import { MovieReviewResponse, MovieReviewResult } from '@/interface/I_MovieReview';
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

    const [movieInfo, movieCrew, movieReview] = res;

    const { images } = yield select((state) => state.configuration);

    yield put(
      setMovieDetail({
        movieInfo: {
          ...movieInfo.data,
          poster_path: `${images.secure_base_url}${images.poster_sizes[4]}${movieInfo.data.poster_path}`,
        },
        movieCrew: movieCrew.data.crew
          .map((item: Cast) => {
            return {
              ...item,
              profile_path: `${images.secure_base_url}${images.poster_sizes[4]}/${item.profile_path}`,
            };
          })
          .filter(
            (item: Cast, index: number, array: Cast[]) =>
              array.findIndex((i) => i.id === item.id) === index,
          )
          .sort((a: Cast, b: Cast) => b.popularity - a.popularity),
        movieReview: {
          ...movieReview.data,
          results: movieReview.data.results.map((review: MovieReviewResult) => {
            return {
              ...review,
              author_details: {
                ...review.author_details,
                avatar_path: `${images.secure_base_url}${images.poster_sizes[4]}${review.author_details?.avatar_path}`,
              },
            };
          }),
        },
      }),
    );
  } catch (err) {
    console.error(err);
  }
}

function* handleGetMovieDetailComment(action: PayloadAction<{ id: number; page: number }>) {
  try {
    const res: AxiosResponse<MovieReviewResponse> = yield call(
      getMovie.getMovieReviews,
      action.payload.id,
      action.payload.page,
    );
    const { data } = res;

    const { movieReview } = yield select((state) => state.movie.movieDetail);

    const finalResult = {
      ...movieReview,
      page: data.page,
      results: [...movieReview.results, ...data.results],
    };

    yield put(setMovieDetailComment(finalResult));
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

export function* watchGetMovieDetailComment() {
  yield takeLatest(getMovieDetailComment.type, handleGetMovieDetailComment);
}
