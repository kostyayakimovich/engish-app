import { all } from 'redux-saga/effects';

import authorizationSagaWatcher from './sagas/authorizationSaga';

export function* rootSaga() {
  yield all([
    authorizationSagaWatcher,
  ]);
};
