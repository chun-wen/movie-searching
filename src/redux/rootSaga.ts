import { all, fork } from 'redux-saga/effects';

import * as configurationSaga from '@/Saga/configurationSaga';
import * as movieSaga from '@/Saga/movieSaga';
import * as userSaga from '@/Saga/userSaga';

export default function* rootSaga() {
  yield all(
    [
      ...Object.values(movieSaga),
      ...Object.values(configurationSaga),
      ...Object.values(userSaga),
    ].map(fork),
  );
}
