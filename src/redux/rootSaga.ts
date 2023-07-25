import { all, fork } from 'redux-saga/effects';

import * as configurationSaga from '@/Saga/configurationSaga';
import * as movieSaga from '@/Saga/movieSaga';

export default function* rootSaga() {
  yield all([...Object.values(movieSaga), ...Object.values(configurationSaga)].map(fork));
}
