import { all, fork } from 'redux-saga/effects';

import * as movieSaga from '@/Saga/movieSaga';

export default function* rootSaga() {
  yield all([...Object.values(movieSaga)].map(fork));
}
