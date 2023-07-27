import { all, fork } from 'redux-saga/effects';

import * as configurationSaga from '@/Sagas/configurationSaga';
import * as movieSaga from '@/Sagas/movieSaga';
import * as userSaga from '@/Sagas/userSaga';

export default function* rootSaga() {
  yield all(
    [
      ...Object.values(movieSaga),
      ...Object.values(configurationSaga),
      ...Object.values(userSaga),
    ].map(fork),
  );
}
