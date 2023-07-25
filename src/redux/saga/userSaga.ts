import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import { getCollectionMovie, setCollectionMovie } from '../slice/userSlice';

function* getUserCollectionMovie(action: PayloadAction<any>) {
  try {
    yield put(setCollectionMovie(action.payload));
  } catch (error) {
    console.warn(error);
  }
}

export function* watchUserCollectionMovie() {
  yield takeLatest(getCollectionMovie.type, getUserCollectionMovie);
}
