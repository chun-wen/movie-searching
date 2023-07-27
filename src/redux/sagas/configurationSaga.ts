import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ConfigureRootObject } from '@/Interface/I_Configuration';

import getConfigurationApi from '@/server/api/getConfiguration';

import { getConfiguration, setConfiguration } from '../slices/configurationSlice';

function* handleGetConfiguration() {
  try {
    const res: AxiosResponse<ConfigureRootObject> = yield call(getConfigurationApi.getDetails);
    const { data } = res;

    yield put(setConfiguration(data));
  } catch (err) {
    console.error(err);
  }
}

export function* watchgetConfiguration() {
  yield takeLatest(getConfiguration.type, handleGetConfiguration);
}
